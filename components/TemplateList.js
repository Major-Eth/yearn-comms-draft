import	React					from	'react';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{parseMarkdownUnset}	from	'utils';

function	Template({path, allPosts}) {
	return (
		<section>
			<div className={'pt-2 mt-10 w-full md:mt-20'}>
				<div className={'flex flex-col '}>
					<div className={'mb-8 masonry sm:masonry-sm md:masonry-md'}>
						{(allPosts || []).map((post, index) => {
							if (!post) {
								return (
									<div className={'mb-4 break-inside'} key={index}>
										<div className={'overflow-hidden w-full bg-white dark:bg-dark-600 rounded-sm cursor-pointer'}>
										</div>
									</div>
								);
							}
							return (
								<div className={'mb-4 break-inside'} key={post.slug}>
									<Link href={`/${path}/${post.slug}`}>
										<div className={'overflow-hidden w-full bg-white dark:bg-dark-600 rounded-sm cursor-pointer'}>
											<div className={'flex w-full border-b border-ygray-500 dark:border-dark-400'}>
												<Image
													src={post?.image?.src || '/default.jpeg'}
													quality={90}
													objectFit={'cover'}
													loading={'eager'}
													width={post?.image?.width || 800}
													height={post?.image?.height || 445} />
											</div>
											<div className={'p-4'}>
												<div className={'flex flex-row justify-between mb-2 w-full'}>
													<p className={'text-xs text-ygray-300 dark:text-dark-50'}>{`by ${post?.author || 'Yearn'}`}</p>
													<p className={'text-xs text-ygray-300 dark:text-dark-50'}>
														{`${new Date(post?.date || '').toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'short', day:'numeric'})}`}
													</p>
												</div>
												<h2
													className={'font-title text-2xl font-bold text-ygray-100 dark:text-white'}
													dangerouslySetInnerHTML={{__html: parseMarkdownUnset(post?.title || '')}} />
											</div>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Template;