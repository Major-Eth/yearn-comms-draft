import	React							from	'react';
import	Head							from	'next/head';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{useRouter}						from	'next/router';
import	ErrorPage						from	'next/error';
import	remarkGfm						from	'remark-gfm';
import	ReactMarkdown					from	'react-markdown';
import	{getPostBySlug, getAllPosts, getRelatedPosts} 	from	'utils/content';
import	{parseMarkdown}					from	'utils';
import	LOCALES							from	'utils/locale';

function Chevron({className}) {
	return (
		<svg className={className} width={'16'} height={'16'} viewBox={'0 0 16 16'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M4.83146 2.89436C5.07392 2.61727 5.49509 2.58919 5.77218 2.83165L11.1055 7.49831C11.2502 7.6249 11.3332 7.80779 11.3332 8.00003C11.3332 8.19227 11.2502 8.37516 11.1055 8.50175L5.77218 13.1684C5.49509 13.4109 5.07392 13.3828 4.83146 13.1057C4.58901 12.8286 4.61709 12.4074 4.89418 12.165L9.65412 8.00003L4.89418 3.83508C4.61709 3.59263 4.58901 3.17145 4.83146 2.89436Z'} fill={'#0657F9'}/>
		</svg>
	);
}

function Post({post, newer, older}) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
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
				{newer ? <Link href={`/announcements/${newer?.slug}`}>
					<div className={'flex flex-row'}>
						<Chevron className={'transform rotate-180'} />
						<p className={'text-yblue cursor-pointer text-xs ml-1'}>{newer?.title.replaceAll('~~', '')}</p>
					</div>
				</Link> : <div />}
				{older ? <Link href={`/announcements/${older?.slug}`}>
					<div className={'flex flex-row'}>
						<p className={'text-yblue cursor-pointer text-xs mr-1'}>{older?.title.replaceAll('~~', '')}</p>
						<Chevron />
					</div>
				</Link>: <div />}
			</div>
			<article className={'w-full p-4 bg-white'}>
				<div className={'flex flex-col mb-6'}>
					<p className={'text-xs text-ygray-300 pb-6'}>
						{/* {`by ${post?.author || 'Yearn'} ${post?.date}`} */}
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
	const post = getPostBySlug(
		'_announcements',
		params.slug,
		['title', 'image', 'date', 'slug', 'author', 'content', 'translator'],
		locale,
		true
	);
	const [newer, older] = await getRelatedPosts('_announcements', ['slug', 'date', 'title'], locale, false, params.slug);

	return {
		props: {post, newer: newer || null, older: older || null},
	};
}

export async function getStaticPaths() {
	const paths = [];

	Object.values(LOCALES).map((lang) => {
		const posts = getAllPosts('_announcements', ['slug'], lang);
		paths.push(...posts.map((post) => ({params: {slug: post.slug}, locale: lang})));
	});

	return {
		paths,
		fallback: true,
	};
}