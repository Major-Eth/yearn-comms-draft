import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';

export function getPostSlugs(dir) {
	const postsDirectory = join(process.cwd(), `public/_posts/${dir}`);
	return fs.readdirSync(`${postsDirectory}`);
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
					if (src.startsWith('./')) {
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

export function getAllPosts(dir, fields = [], locale, withFallback = false) {
	const slugs = getPostSlugs(dir);
	const posts = slugs
		.map((slug) => getPostBySlug(dir, slug, fields, locale, withFallback)).filter(Boolean)
		.sort((post1, post2) => (post1.date > post2?.date ? -1 : 1));
	return posts;
}