import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
	const [sales, setSales] = useState(props.sales);
	// const [isLoading, setIsLoading] = useState(false);

	const { data, isLoading, error } = useSWR(
		'https://nextjs-course-38c8f-default-rtdb.firebaseio.com/sales.json',
		(url) => {
			return fetch(url).then((response) => response.json());
		}
	);

	useEffect(() => {
		if (data) {
			const transformedSales = [];

			for (const key in data) {
				transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
			}

			setSales(transformedSales);
		}
	}, [data]);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetch('https://nextjs-course-38c8f-default-rtdb.firebaseio.com/sales.json')
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const transformedSales = [];

	// 			for (const key in data) {
	// 				transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
	// 			}

	// 			setSales(transformedSales);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	if (error) {
		return <p>Failed to load</p>;
	}

	console.log('data', data);
	console.log('data', error);
	console.log('isLoading', isLoading);

	if (!data && !sales) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	const response = await fetch('https://nextjs-course-38c8f-default-rtdb.firebaseio.com/sales.json');

	const data = await response.json();

	const transformedSales = [];

	for (const key in data) {
		transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
	}

	return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalesPage;
