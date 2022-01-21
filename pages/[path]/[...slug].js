import	React							from	'react';
import	Head							from	'next/head';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{useRouter}						from	'next/router';
import	ErrorPage						from	'next/error';
import	remarkGfm						from	'remark-gfm';
import	ReactMarkdown					from	'react-markdown';
import	{getPostBySlug, getSlugs, getRelatedPosts, listAllPosts} 	from	'utils/content';
import	{parseMarkdown}					from	'utils';
import	LOCALES							from	'utils/locale';
import	TemplateList			from	'components/TemplateList';

function Chevron({className}) {
	return (
		<svg className={className} width={'16'} height={'16'} viewBox={'0 0 16 16'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M4.83146 2.89436C5.07392 2.61727 5.49509 2.58919 5.77218 2.83165L11.1055 7.49831C11.2502 7.6249 11.3332 7.80779 11.3332 8.00003C11.3332 8.19227 11.2502 8.37516 11.1055 8.50175L5.77218 13.1684C5.49509 13.4109 5.07392 13.3828 4.83146 13.1057C4.58901 12.8286 4.61709 12.4074 4.89418 12.165L9.65412 8.00003L4.89418 3.83508C4.61709 3.59263 4.58901 3.17145 4.83146 2.89436Z'} fill={'#0657F9'}/>
		</svg>
	);
}

function Post({path, post, newer, older, allPosts, isListing}) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug && isListing) {
		return <TemplateList path={path} allPosts={allPosts} />;
	} else if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	} else if (!post?.slug && !isListing) {
		return null;
	}
	return (
		<div>
			<Head>
				<title>
					{post?.title || ''}
				</title>
				{post?.ogImage?.url ? <meta property={'og:image'} content={post.ogImage.url} /> : null}
			</Head>
			<div className={'flex flex-row justify-between py-6'}>
				{newer ? <Link href={`/${path}/${newer?.slug}`}>
					<div className={'flex flex-row'}>
						<Chevron className={'transform rotate-180'} />
						<p className={'text-yblue cursor-pointer text-xs ml-1'}>{(newer?.title || '')?.replace(/~~/g, '')}</p>
					</div>
				</Link> : <div />}
				{older ? <Link href={`/${path}/${older?.slug}`}>
					<div className={'flex flex-row'}>
						<p className={'text-yblue cursor-pointer text-xs mr-1'}>{(older?.title || '')?.replace(/~~/g, '')}</p>
						<Chevron />
					</div>
				</Link>: <div />}
			</div>
			<article className={'w-full p-4 bg-white'}>
				<div className={'flex flex-col mb-6'}>
					<p className={'text-xs text-ygray-300 pb-6'}>
						{`${new Date(post?.date || '').toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'short', day:'numeric'})} | Written by ${post?.author || 'Yearn'}${post?.translator ? ` | Translated by ${post?.translator || 'Yearn'}` : ''}`}
					</p>
					<h1
						className={'text-ygray-100 dark:text-white font-bold whitespace-pre-line font-title text-2xl'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(post?.title || '')}} />
				</div>
				<div className={'prose w-full max-w-full space-y-6 mb-8 prose-yblue text-ygray-200 dark:text-dark-50'}>
					<ReactMarkdown
						components={{
							img: ({...props}) => {
								const	srcStartWithHttp = props.src.startsWith('http');
								const	srcStartWithHttps = props.src.startsWith('https');
								const	srcStartWithSlash = props.src.startsWith('/');
								if (!srcStartWithHttp && !srcStartWithHttps && !srcStartWithSlash) {
									props.src = `/_posts/_${router.asPath.substring(1)}/${props.src}`;
								}
								const width = props.src.match(/w=(\d+)/)?.[1] || 0;
								const height = props.src.match(/h=(\d+)/)?.[1] || 0;
								return (
									<Image
										className={'bg-ygray-600'}
										quality={95}
										width={width || 880}
										objectFit={height + width === 0 ? 'contain' : ''}
										height={height || 600}
										{...props} />
								);
							}
						}}
						remarkPlugins={[remarkGfm]}>
						{post?.content || ''}
					</ReactMarkdown>
				</div>
			</article>
		</div>
	);
}

export default Post;

export async function getStaticProps({params, locale}) {
	const	actualSlug = params.slug;
	if (
		(params.path === 'financials' && (params.slug.length === 1 && params.slug[0] === 'quarterly-report')) ||
		(params.path === 'articles' && (params.slug.length === 1 && params.slug[0] === 'andre-cronje')) ||
		(params.path === 'articles' && (params.slug.length === 1 && params.slug[0] === 'forum')) ||
		(params.path === 'articles' && (params.slug.length === 1 && params.slug[0] === 'wot-is-goin-on')) ||
		(params.path === 'articles' && (params.slug.length === 1 && params.slug[0] === 'yearn-finance'))
	) {
		const	_allPosts = listAllPosts(`_${params.path}`, params.slug, locale);
		const	col1 = [];
		const	col2 = [];
		const	col3 = [];
		for (let index = 0; index < _allPosts.length; index += 3) {
			let		rIndex = index;
			if (_allPosts[rIndex])
				col1.push(_allPosts[rIndex]);
			if (_allPosts[rIndex + 1])
				col2.push(_allPosts[rIndex + 1]);
			if (_allPosts[rIndex + 2])
				col3.push(_allPosts[rIndex + 2]);
		}
		return {
			props: {
				allPosts: [...col1, ...col2, ...col3],
				isListing: true,
				path: `${params.path}/${actualSlug}`
			},
		};
	}

	const slug = params.slug[params.slug.length - 1];
	const path = `_${params.path}/${params.slug.slice(0, -1).join('/')}`;
	const post = getPostBySlug(
		path,
		slug,
		['title', 'image', 'date', 'slug', 'author', 'content', 'translator'],
		locale,
		true
	);
	const [newer, older] = await getRelatedPosts(
		path,
		['slug', 'date', 'title'],
		locale,
		false,
		slug
	);

	return {
		props: {
			post,
			path: params.path,
			newer: newer || null,
			older: older || null
		},
	};
}

export async function getStaticPaths() {
	const parentPaths = [
		// 'announcements',
		// 'newsletters',
		// 'podcasts',
		// 'financials',
		'articles'
	];
	const paths = [];

	for (let index = 0; index < parentPaths.length; index++) {
		const element = parentPaths[index];
		Object.values(LOCALES).map(({code}) => {
			const slugs = getSlugs(`_${element}`, code, false);
			const uniqueSlugs = [...new Set(slugs)];
			for (let index = 0; index < uniqueSlugs.length; index++) {
				const slug = uniqueSlugs[index];
				const slugAsArr = slug.split('/');
				const slugAsArrNoLast = slugAsArr.slice(0, -1);

				paths.push({
					params: {
						path: element,
						slug: slugAsArrNoLast,
					},
					locale: code
				});
			}
		});	
	}

	Object.values(LOCALES).map(({code}) => {
		paths.push({params: {path: 'financials', slug: ['quarterly-report']}, locale: code});
		paths.push({params: {path: 'articles', slug: ['forum']}, locale: code});
		paths.push({params: {path: 'articles', slug: ['andre-cronje']}, locale: code});
		paths.push({params: {path: 'articles', slug: ['wot-is-goin-on']}, locale: code});
		paths.push({params: {path: 'articles', slug: ['yearn-finance']}, locale: code});
	});

	return {
		paths,
		fallback: false,
	};
}