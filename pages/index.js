import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
	const { products } = props;

	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</ul>
	);
}

// getStaticProps func 의 목적은 to prepare props for component
// 1. next executes this func
// 2. and then executes component func
export async function getStaticProps() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	if (!data) {
		return {
			redirect: {
				destination: '/no-data',
			},
		};
	}

	if (data.products.length === 0) {
		return {
			notFound: true, // use when data fetching failed
		};
	}

	return {
		props: {
			products: data.products,
		},
		revalidate: 10,
	};
}

export default HomePage;
