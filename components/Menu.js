import	React				from	'react';
import	{useRouter}			from	'next/router';
import	Link				from	'next/link';
import	useLocalization		from	'contexts/useLocalization';
import	useUI				from	'contexts/useUI';
import	LOCALES				from	'utils/locale';

function	MenuItem({label, condition, href, className, height = 'h-6'}) {
	return (
		<Link href={href}>
			<div className={`${condition ? 'text-yblue font-bold' : 'text-ygray-200 dark:text-dark-50'} cursor-pointer relative w-full ${className}`}>
				{label}
				<div className={'hidden absolute top-0 z-20 md:block'} style={{right: 4}}>
					<div className={`w-1 ${height} bg-yblue rounded-sm ${condition ? 'opacity-100' : 'opacity-0'}`} />
				</div>
			</div>
		</Link>
	);
}

function	MenuItems() {
	const	router = useRouter();
	const	{common} = useLocalization();
	return (
		<div className={'w-64.5'}>
			<MenuItem
				className={'mb-2 md:mb-4'}
				label={common['menu-announcements']}
				condition={router.asPath.startsWith('/announcements') || router.asPath === '/'}
				href={'/announcements'} />
			<MenuItem
				className={'mb-2 md:mb-4'}
				label={common['menu-newsletters']}
				condition={router.asPath.startsWith('/newsletters')}
				href={'/newsletters'} />
			<MenuItem
				className={'mb-2 text-ygray-400 dark:text-dark-200 md:mb-4'}
				label={common['menu-articles']}
				condition={
					router.asPath.startsWith('/articles')
					&&
					!router.asPath.startsWith('/articles/forum')
					&&
					!router.asPath.startsWith('/articles/andre-cronje')
					&&
					!router.asPath.startsWith('/articles/wot-is-goin-on')
					&&
					!router.asPath.startsWith('/articles/yearn-finance')
				}
				href={'/articles'} />
			<div className={'mb-4 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
				<MenuItem
					className={'mb-2 md:mb-4'}
					label={common['menu-articles-forum']}
					condition={router.asPath.includes('articles/forum')}
					href={'/articles/forum'} />
				<MenuItem
					className={'mb-2 md:mb-4'}
					label={common['menu-articles-andre']}
					condition={router.asPath.includes('articles/andre-cronje')}
					href={'/articles/andre-cronje'} />
				<MenuItem
					className={'mb-2 md:mb-4'}
					label={common['menu-articles-wot']}
					condition={router.asPath.includes('articles/wot-is-goin-on')}
					href={'/articles/wot-is-goin-on'} />
				<MenuItem
					className={'mb-4 md:mb-8'}
					label={common['menu-articles-yearn']}
					condition={router.asPath.includes('articles/yearn-finance')}
					href={'/articles/yearn-finance'} />
			</div>
			<MenuItem
				className={'mb-2 text-ygray-400 dark:text-dark-200 md:mb-4'}
				label={common['menu-financials']}
				condition={
					router.asPath.startsWith('/financials')
					&&
					!router.asPath.startsWith('/financials/quarterly-report')
				}
				href={'/financials'} />
			<div className={'mb-4 ml-4 space-y-2 md:mb-8 md:space-y-4'}>
				<MenuItem
					className={'mb-4 md:mb-8'}
					label={common['menu-financials-quarterly-report']}
					condition={router.asPath.startsWith('/financials/quarterly-report')}
					href={'/financials/quarterly-report'} />
			</div>
			<MenuItem
				className={'mb-2 md:mb-4'}
				label={common['menu-tweets']}
				condition={router.asPath.startsWith('/tweets')}
				href={'/tweets'} />
			<MenuItem
				label={common['menu-podcasts']}
				condition={router.asPath.startsWith('/podcasts')}
				href={'/podcasts'} />
			
			<div className={'relative mt-12 w-full text-ygray-200 dark:text-dark-50 cursor-pointer'}>
				<a href={'https://yearn.finance'} target={'_blank'} rel={'noreferrer'}>
					{common['menu-go-to-app']}
				</a>
			</div>
		</div>
	);
}

function	Menu() {
	const	{language, set_language} = useLocalization();
	const	{theme, switchTheme} = useUI();
	const	router = useRouter();
	const	head = React.useRef();
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	
	function	onExpand() {
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout(() => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout(() => set_isExpandedAnimation(true), 1);
		}
	}

	React.useEffect(() => {
		if (head?.current) {
			head.current.oncontextmenu = (event) => {
				if (event.button === 2) {
					event.preventDefault();
					router.push('/internal/missing-descriptions');
				}
			};
		}
	}, [head?.current]);

	React.useEffect(() => {
		set_isExpandedAnimation(false);
		setTimeout(() => set_isExpanded(false), 500);
	}, [router.asPath]);

	return (
		<nav className={'fixed z-50 px-4 w-full bg-white dark:bg-dark-900 shadow-sm md:relative md:px-0 md:w-64.5 md:bg-white/0 md:dark:bg-dark-900 md:shadow-none'}>
			<div className={'relative z-20 w-full h-full md:fixed md:w-64.5'}>
				<div className={'flex relative flex-col w-full h-full'}>
					<div className={'flex flex-row justify-between items-center'}>
						<Link href={'/'}>
							<h1
								ref={head}
								className={'pt-6 mb-6 font-bold text-ygray-100 dark:text-white cursor-pointer md:pt-8 md:mb-10'}>
								<span className={'text-yblue'}>{'Yearn'}</span>
								{' Blog'}
							</h1>
						</Link>

						<div className={'block md:hidden'}>
							<select
								value={language}
								className={'flex items-center py-2 px-3 pr-7 m-0 mr-1 text-xs font-semibold text-ygray-700 dark:text-dark-50 whitespace-nowrap bg-white dark:bg-dark-600 border border-ygray-500 dark:border-dark-600 border-solid cursor-pointer'}
								onChange={e => set_language(e.target.value)}>
								{Object.values(LOCALES).map((lang, index) => (
									<option className={'cursor-pointer'} key={index} value={lang.code}>{lang.symbol}</option>
								))}
							</select>
						</div>

						<svg aria-hidden={'true'} className={'block w-6 h-6 text-yblue md:hidden'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 448 512'} onClick={onExpand}><path fill={'currentColor'} d={'M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z'}></path></svg>
					</div>
					<div className={'hidden md:block'}>
						<MenuItems />
					</div>
					<div className={'hidden flex-row justify-between items-center mt-auto mb-10 md:flex'}>
						<div className={'flex flex-row items-center space-x-4'}>
							<select
								value={language}
								className={'flex items-center py-2 px-3 pr-7 m-0 mr-1 text-xs font-semibold text-ygray-700 dark:text-dark-50 whitespace-nowrap bg-white dark:bg-dark-600 border border-ygray-500 dark:border-dark-600 border-solid cursor-pointer'}
								onChange={(e) => {
									router.push(router.asPath, router.asPath, {locale: e.target.value});
									set_language(e.target.value);
								}}>
								{Object.values(LOCALES).map((lang, index) => (
									<option className={'cursor-pointer'} key={index} value={lang.code}>{lang.name}</option>
								))}
							</select>
							
						</div>
						<div className={'flex flex-row items-center mr-8 space-x-4'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				</div>
			</div>
			<div className={'hidden absolute inset-y-0 -right-1 z-10 md:block'}>
				<div className={'w-0.5 h-full bg-ygray-500 dark:bg-dark-600'} />
			</div>
			<div className={`w-full inset-x-0 transition-max-height duration-500 overflow-hidden bg-white dark:bg-dark-900 fixed ${isExpandedAnimation ? 'max-h-max shadow-sm' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'block relative px-6 md:hidden'}>
						<MenuItems />
						<div className={'absolute top-0 right-5'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				) : <div />}
			</div>
		</nav>
	);
}

export default Menu;
