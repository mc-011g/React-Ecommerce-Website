import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { UserContext } from "../CartContext/UserContext.js";
import { ProductContext } from "../CartContext/ProductContext.js";

const Navbar = ({ products }) => {
    const { cart } = useContext(ProductContext);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [searchBarResults, setSearchBarResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const { fetchUser } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (fetchUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [fetchUser])

    useEffect(() => {
        let newCartQuantity = 0;
        cart.forEach((product) => (
            newCartQuantity += parseInt(product.quantity)
        ));
        setCartQuantity(newCartQuantity);
    }, [cart]);

    const handleSearchBarResults = (searchText) => {
        setSearchText(searchText);
        const searchedProducts = products.filter((product) =>
            ((product.name).toLowerCase()).includes(searchText.toLowerCase())
        );
        if (searchText !== "") {
            setSearchBarResults(searchedProducts);
        } else {
            setSearchBarResults([]);
        }
    }

    const handleSearchResults = (e) => {
        e.preventDefault();
        setDisplaySearchResults(false);
        redirectNow();
    }

    const resetSearchResults = () => {
        setSearchBarResults([]);
    }

    const redirectNow = () => {
        navigate(`/searchResults/?search=${searchText}`)
    }

    return (
        <>
            {displaySearchResults &&
                <div className="searchContainer">
                    <div className="searchBar">
                        <h4>Search Results</h4>
                        <form onSubmit={handleSearchResults}>
                            <div className="d-inline-flex w-100 border rounded">
                                <input className="form-control mt-0 searchInput border-0" value={searchText} onChange={(e) => handleSearchBarResults(e.target.value)} type="search" aria-label="Search" placeholder="Search" />
                                <i className="bi bi-search searchButton pe-2"></i>
                            </div>
                        </form>
                        <i className="bi bi-x closeSearchButton" onClick={() => setDisplaySearchResults(false)}></i>

                        <div className="searchResultsContainer overflow-y-scroll">
                            <div className="searchResults py-5">
                                {searchBarResults.map((product) => (
                                    <Link to={`/product-page/${(product._id)}`} onClick={() => setDisplaySearchResults(false)} className="product" key={product._id}>
                                        <img src={product.imageURL} className="product-img" alt="Product" />
                                        <div className='m-3'>
                                            <span className="product-title">{product.name}</span>
                                            <div className="product-price">${product.price}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            }

            <nav className="navbar sticky-top navbar-expand-lg bg-white">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={resetSearchResults}>React Ecommerce Website</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav mb-2 mb-lg-0">
                            <div className="nav-item-group">
                                <div className="nav-item-product-group-collapsed">
                                    <Link to="/products/Shoes" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Shoes</Link>
                                    <Link to="/products/Boots" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Boots</Link>
                                    <Link to="/products/Athletic" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Athletic Shoes</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navButtons" >
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navIcons">
                            <div className="nav-link searchIcon" aria-current="page" onClick={() => setDisplaySearchResults(true)} >
                                <i className="bi bi-search nav-icon"></i>
                            </div>
                            <Link
                                to={`${(isLoggedIn ? "/profile" : "/login")}   `}
                                className="nav-link" aria-current="page" onClick={resetSearchResults} >
                                <i className="bi bi-person nav-icon"></i>
                            </Link>
                            <Link to="/cart" className="nav-link" aria-current="page" onClick={resetSearchResults}>
                                <div className="d-flex justify-content-center align-items-center position-relative">
                                    <i className="bi bi-bag nav-icon"></i>
                                    <span className="cartQuantity">
                                        {cartQuantity}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="nav-item-product-group">
                        <Link to="/products/Shoes" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Shoes</Link>
                        <Link to="/products/Boots" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Boots</Link>
                        <Link to="/products/Athletic" className="nav-link nav-product-link" aria-current="page" onClick={resetSearchResults}>Athletic Shoes</Link>
                    </div>
                </div>
            </nav >
        </>
    );
};

export default Navbar;