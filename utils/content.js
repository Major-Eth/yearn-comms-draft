import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';

export function getPostSlugs(dir, subdir) {
	const postsDirectory = join(process.cwd(), `public/_posts/${dir}`);
	const dirContent = fs.readdirSync(`${postsDirectory}`);
	const toRet = [];
	for (let index = 0; index < dirContent.length; index++) {
		toRet.push(`${subdir ? `${subdir}/` : ''}${dirContent[index]}`);
	}
	return (toRet);
}

export function getPostBySlug(dir, slug, fields = [], locale, withFallback) {
	const	postsDirectory = join(process.cwd(), `public/_posts/${dir}`);
	const	realSlug = slug.replace(/\.md$/, '');
	const	fullPath = join(`${postsDirectory}/${realSlug}/${locale}.md`);

	if (!fs.existsSync(fullPath)) {
		if (withFallback) {
			const	fullPathEN = join(`${postsDirectory}/${realSlug}/en.md`);
			const	fileContents = fs.readFileSync(fullPathEN, 'utf8');
			const	{data, content} = matter(fileContents);
			const	items = {slug: realSlug};
	
			// Ensure only the minimal needed data is exposed
			fields.forEach((field) => {
				if (field === 'content') {
					items[field] = content;
				}
	
				if (data[field]) {
					if (field === 'image') {
						const {src, width, height} = data[field];
						if ((src || '').startsWith('./')) {
							items[field] = {
								src: src.replace('./', `/_posts/${dir}/${realSlug}/`),
								width,
								height
							};
						}
					} else {
						items[field] = data[field];
					}
				}
			});
			return items;
		}
		return null;
	} else {
		const	fileContents = fs.readFileSync(fullPath, 'utf8');
		const	{data, content} = matter(fileContents);
		const	items = {slug: realSlug};

		// Ensure only the minimal needed data is exposed
		fields.forEach((field) => {
			if (field === 'content') {
				items[field] = content;
			}

			if (data[field]) {
				if (field === 'image') {
					const {src, width, height} = data[field];
					if ((src || '').startsWith('./')) {
						items[field] = {
							src: src.replace('./', `/_posts/${dir}/${realSlug}/`),
							width,
							height
						};
					}
				} else {
					items[field] = data[field];
				}
			}
		});

		return items;
	}
}

export function getRelatedPosts(dir, fields = [], locale, withFallback = false, postSlug) {
	const slugs = getPostSlugs(dir);
	const posts = slugs
		.map((slug) => getPostBySlug(dir, slug, fields, locale, withFallback))
		.filter(Boolean)
		.sort((post1, post2) => (post1.date > post2?.date ? -1 : 1));
	

	for (let index = 0; index < posts.length; index++) {
		const {slug} = posts[index];
		if (slug === postSlug) {
			if (index > 0 && index < posts.length - 1) {
				return [posts[index - 1], posts[index + 1]];
			} else if (index === 0) {
				return [null, posts[index + 1]];
			} else if (index === posts.length - 1) {
				return [posts[index - 1], null];
			}
		}
	}
	return [];
}

export function getAllPosts(
	dir,
	paths = [''],
	fields = [],
	locale,
	withFallback = false
) {
	let	slugs = [];
	for (let index = 0; index < paths.length; index++) {
		slugs.push(
			...getPostSlugs(
				`${dir}${paths[index] ? `/${paths[index]}/` : paths[index]}`,
				paths[index]
			)
		);
	}

	// const slugs = getPostSlugs(dir);
	// console.log(slugs);
	const posts = slugs
		.map((slug) => getPostBySlug(dir, slug, fields, locale, withFallback)).filter(Boolean)
		.sort((post1, post2) => (post1.date > post2?.date ? -1 : 1));
	return posts;
}