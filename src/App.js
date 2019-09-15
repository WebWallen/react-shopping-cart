import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
// Contexts
import ProductContext from './contexts/ProductContex';
import CartContext from './contexts/CartContext';



function App() {
	const [products] = useState(data);

	const [cart, setCart] = useState(localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const removeItem = (id) => {
		setCart([...cart.filter(item => id === item.id ? false : true)])
		// item.id !== id shorter way inside of filter
	}



	const addItem = item => {
		setCart([...cart, item]);
	};

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }}>
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route
						exact
						path="/"
						render={() => (
							<Products />
						)}
					/>
					<Route
						path="/cart"
						render={() => <ShoppingCart />}
					/>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
