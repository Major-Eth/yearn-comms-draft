import	React					from	'react';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{parseMarkdownUnset}	from	'utils';
import	{getAllPosts}			from	'utils/content';

function	Index({allPosts}) {
	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8 grid grid-cols-3 gap-4'}>
						{allPosts.map((post) => (
							<Link href={`/announcements/${post.slug}`} key={post.slug}>
								<div className={'w-72 bg-white cursor-pointer hover:shadow-md transition-shadow'}>
									<div>
										<Image
											src={post?.image || '/default.jpeg'}
											objectFit={'cover'}
											objectPosition={'center'}
											width={288}
											height={160} />
									</div>
									<div className={'bg-white p-4'}>
										<div className={'flex flex-row justify-between w-full mb-2'}>
											<p className={'text-xs text-ygray-300'}>{`by ${post?.author || 'Yearn'}`}</p>
											<p className={'text-xs text-ygray-300'}>{`${post?.date}`}</p>
										</div>
										<h2
											className={'text-ygray-100 text-2xl font-bold'}
											style={{color: '#333333'}}
											dangerouslySetInnerHTML={{__html: parseMarkdownUnset(post?.title || '')}} />
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;

export const getStaticProps = async ({locale}) => {
	const allPosts = getAllPosts(
		[
			'title',
			'subtitle',
			'context',
			'date',
			'slug',
			'author',
			'coverImage',
			'image',
			'excerpt',
			'lang',
		],
		locale
	);

	return {
		props: {allPosts, locale},
	};
};