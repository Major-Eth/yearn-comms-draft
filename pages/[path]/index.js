import	React					from	'react';
import	{listAllPosts}			from	'utils/content';
import	TemplateList			from	'components/TemplateList';

function	Index({path, allPosts}) {
	return (
		<TemplateList path={path} allPosts={allPosts} />
	);
}

export default Index;

export const getStaticProps = async ({locale, params}) => {
	const	childrens = {
		'announcements': [''],
		'newsletters': [''],
		'podcasts': [''],
		'financials': ['', 'quarterly-report'],
		'articles': ['', 'andre-cronje', 'forum', 'wot-is-goin-on', 'yearn-finance'],
	};
	const _allPosts = listAllPosts(
		`_${params.path}`,
		childrens[params.path] || [''],
		locale
	);
	const	col1 = [];
	const	col2 = [];
	const	col3 = [];
	for (let index = 0; index < _allPosts.length; index += 3) {
		let		rIndex = index;
		if (_allPosts[rIndex]) {
			col1.push(_allPosts[rIndex]);
		}
		if (_allPosts[rIndex + 1]) {
			col2.push(_allPosts[rIndex + 1]);
		}
		if (_allPosts[rIndex + 2]) {
			col3.push(_allPosts[rIndex + 2]);
		}
	}
	return {
		props: {
			allPosts: [...col1, ...col2, ...col3],
			path: params.path
		},
	};
};

export async function getStaticPaths() {
	return {
		paths: [
			{params: {path: 'announcements'}},
			{params: {path: 'newsletters'}},
			{params: {path: 'podcasts'}},
			{params: {path: 'financials'}},
			{params: {path: 'articles'}},
		],
		fallback: false,
	};
}