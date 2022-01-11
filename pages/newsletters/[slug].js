import	React							from	'react';
import	Head							from	'next/head';
import	{useRouter}						from	'next/router';
import	ErrorPage						from	'next/error';
import	{getPostBySlug, getAllPosts} 	from	'utils/content';
import	{parseMarkdown, markdownToHtml}	from	'utils';
import	LOCALES							from	'utils/locale';

function Post({post}) {
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
			<article className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<h1
						className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8 whitespace-pre-line'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(post?.title || '')}} />
					<div className={'max-w-xl space-y-6 mb-8'}>
						<p className={'text-ygray-200 dark:text-dark-50'}>
							{post?.subtitle || ''}
						</p>
					</div>
				</div>
				<div className={'prose max-w-prose space-y-6 mb-8 prose-yblue'}>
					<div
						className={'text-ygray-200 dark:text-dark-50'}
						dangerouslySetInnerHTML={{__html: post?.content || ''}} />
				</div>

			</article>

		</div>
	);
}

export default Post;

export async function getStaticProps({params, locale}) {
	const post = getPostBySlug(
		'_newsletters',
		params.slug,
		['title', 'image', 'date', 'slug', 'author', 'content'],
		locale,
		true
	);
	const content = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {...post, content}
		},
	};
}

export async function getStaticPaths() {
	const paths = [];

	Object.values(LOCALES).map((lang) => {
		const posts = getAllPosts('_newsletters', ['slug'], lang);
		paths.push(...posts.map((post) => ({params: {slug: post.slug}, locale: lang})));
	});

	return {
		paths,
		fallback: true,
	};
}