import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
	const { loadedProduct } = props;

	// if (!loadedProduct) {
	// 	return <p>Loading...</p>;
	// }

	return (
		<>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</>
	);
}

async function getData() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	return data;
}

// dynamic route - use context parameter
// useRouter 와 다른 점 - useRouter는 브라우저 측에서만 사용 가능
// 프리렌더링 할 때 쓰려면 getStaticProps 써야함, 왜냐면 이 함수는 컴포넌트 함수보다 먼저 실행되니까
export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;

	const data = await getData();

	const product = data.products.find((product) => product.id === productId);

	return {
		props: {
			loadedProduct: product,
		},
	};
}

// pid 는 아래 값으로 3번 pre generate 되어야 한다는 걸 말해주는 getStaticPaths
// 그 다음으로 아래 3개의 id에 대해서 getStaticsProps를 호출한다 (Next가)
export async function getStaticPaths() {
	const data = await getData();
	const ids = data.products.map((product) => product.id);
	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: pathsWithParams,
		fallback: false,
	};
}

export default ProductDetailPage;
