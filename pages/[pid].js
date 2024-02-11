import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
	const { loadedProduct } = props;

	return (
		<>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</>
	);
}

// dynamic route - use context parameter
// useRouter 와 다른 점 - useRouter는 브라우저 측에서만 사용 가능
// 프리렌더링 할 때 쓰려면 getStaticProps 써야함, 왜냐면 이 함수는 컴포넌트 함수보다 먼저 실행되니까
export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;

	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	const product = data.products.find((product) => product.id === productId);

	return {
		props: {
			loadedProduct: product,
		},
	};
}

export default ProductDetailPage;
