import	React					from	'react';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{parseMarkdownUnset}	from	'utils';

function	Template({path, allPosts}) {
	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col '}>
					<div className={'mb-8 masonry sm:masonry-sm md:masonry-md'}>
						{(allPosts || []).map((post) => (
							<div className={'break-inside mb-4'} key={post.slug}>
								<Link href={`/${path}/${post.slug}`}>
									<div className={'w-full bg-white dark:bg-dark-600 rounded-sm cursor-pointer overflow-hidden'}>
										<div className={'border-b border-ygray-500 dark:border-dark-400 flex w-full'}>
											<Image
												src={post?.image?.src || '/default.jpeg'}
												quality={90}
												objectFit={'cover'}
												loading={'eager'}
												className={'masonry-image'}
												width={post?.image?.width || 800}
												height={post?.image?.height || 445} />
										</div>
										<div className={'p-4'}>
											<div className={'flex flex-row justify-between w-full mb-2'}>
												<p className={'text-xs text-ygray-300 dark:text-dark-50'}>{`by ${post?.author || 'Yearn'}`}</p>
												<p className={'text-xs text-ygray-300 dark:text-dark-50'}>
													{`${new Date(post?.date || '').toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'short', day:'numeric'})}`}
												</p>
											</div>
											<h2
												className={'text-ygray-100 dark:text-white text-2xl font-bold font-title'}
												dangerouslySetInnerHTML={{__html: parseMarkdownUnset(post?.title || '')}} />
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Template;