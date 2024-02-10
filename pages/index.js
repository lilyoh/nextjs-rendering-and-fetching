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
	return {
		props: {
			products: [{ id: 'p1', title: 'Product 1' }],
		},
	};
}

export default HomePage;
