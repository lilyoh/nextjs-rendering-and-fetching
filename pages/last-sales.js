import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
	const [sales, setSales] = useState();
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

	if (!data || !sales) {
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

export default LastSalesPage;
