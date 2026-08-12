import { useEffect, useRef, useState } from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { motion } from 'motion/react'
import PaystackPop from '@paystack/inline-js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import { supabase } from './supabase'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   PRODUCTS
========================================================= */

const lipGlossProducts = [
  {
    id: 201,
    name: 'Crimson Muse',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/12E204A0-C30A-49E3-8784-FF070DBE1C39.PNG',
    tone: 'rose',
  },
  {
    id: 202,
    name: 'Pink Aura',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/46C8F030-8E23-4CD8-960C-D8CD7C597FA0.PNG',
    tone: 'pink',
  },
  {
    id: 203,
    name: 'Nude Glow',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/64125DD9-8830-4E52-9F8A-8C493AFCE8EB.PNG',
    tone: 'nude',
  },
  {
    id: 204,
    name: 'Berry Kiss',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/8DF47953-3A08-4651-BA5E-621C5FFD0EFF.PNG',
    tone: 'cherry',
  },
  {
    id: 205,
    name: 'Rose Drip',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/93BBB2F7-B03C-4A01-B01F-1E1A2F49B919.PNG',
    tone: 'rose',
  },
  {
    id: 206,
    name: 'Cocoa Glaze',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/BE89B6A8-567A-4E52-B0AC-9F64E1C495D7.PNG',
    tone: 'nude',
  },
  {
    id: 207,
    name: 'Cherry Glass',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/C9B6285F-2A68-409A-B78A-E020DDF7ED98.PNG',
    tone: 'cherry',
  },
  {
    id: 208,
    name: 'Blush Pop',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/DB51D2A4-C303-421F-86CF-E883383296F7.PNG',
    tone: 'pink',
  },
  {
    id: 209,
    name: 'Honey Shine',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/DC15C6CE-0EC6-414D-9AAC-2FD07B157075.PNG',
    tone: 'nude',
  },
  {
    id: 210,
    name: 'Mauve Mood',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/EB8BC9A9-FC56-42C1-ADC4-71F3DB365B7D.PNG',
    tone: 'pink',
  },
  {
    id: 211,
    name: 'Crystal Kiss',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/F18C95E2-62BB-4D4C-AB04-F394FBB079D7.PNG',
    tone: 'rose',
  },
  {
    id: 212,
    name: 'Velvet Rose',
    category: 'Lip Gloss',
    price: 5000,
    image:
      '/Products/Lipglosses/FB3940D1-864C-401F-BF06-A56871354DF4.PNG',
    tone: 'rose',
  },
]

const shadesProducts = [
  {
    id: 101,
    name: 'Tortoise Muse',
    category: 'Shades',
    price: 7000,
    image:
      '/Products/Shades/61F379BD-E4BF-4503-ADFF-E9E1C76E61FC.PNG',
    tone: 'black',
  },
  {
    id: 102,
    name: 'Lime Edge',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/106EAAB5-FD26-4E98-B901-480408079847.PNG',
    tone: 'pink',
  },
  {
    id: 103,
    name: 'Ivory Orbit',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/175B0D39-AD65-4287-97F5-3582EBC4F32F.PNG',
    tone: 'clear',
  },
  {
    id: 104,
    name: 'Tortoise Angle',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/B9CD115B-4373-4705-8CE1-01D81393012E.PNG',
    tone: 'black',
  },
  {
    id: 105,
    name: 'Midnight Scholar',
    category: 'Shades',
    price: 7000,
    image:
      '/Products/Shades/DFEAEB11-0450-4938-B93E-F3BE9BA0702A.PNG',
    tone: 'black',
  },
  {
    id: 106,
    name: 'Mocha Edge',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/E8F64D4B-A78B-41C0-8407-4CD53EA6613B.PNG',
    tone: 'pink',
  },
  {
    id: 107,
    name: 'Tortoise Halo',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/E995A195-9868-4533-A50B-A587D0947C3B.PNG',
    tone: 'black',
  },
  {
    id: 108,
    name: 'Noir Orbit',
    category: 'Shades',
    price: 8000,
    image:
      '/Products/Shades/EC8CE62D-4BA4-475E-A5F5-F5D6E80DEFF3.PNG',
    tone: 'black',
  },
]

const products = [
  ...lipGlossProducts,
  ...shadesProducts,
]

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ cartCount = 0 }) {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to="/" className="navbar-logo-link">
        <motion.img
          src="/Brand/pengstore-logo.png"
          alt="The Pengstore"
          className="navbar-brand-logo"
          whileHover={{
            scale: 1.05,
            rotate: -1,
          }}
          transition={{
            duration: 0.25,
          }}
        />
      </Link>

      <div className="nav-links">
        {[
          ['Home', '/'],
          ['Shop', '/shop'],
          ['Shades', '/shades'],
          ['Lip Gloss', '/lip-gloss'],
          ['About', '/about'],
          ['Contact', '/contact'],
        ].map(([label, path]) => (
          <motion.div key={label} whileHover={{ y: -3 }}>
            <Link to={path}>
              {label}
            </Link>
          </motion.div>
        ))}
      </div>

      <Link to="/cart">
        <motion.button
          className="nav-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cart {cartCount > 0 ? `(${cartCount})` : ''}
        </motion.button>
      </Link>
    </motion.nav>
  )
}

/* =========================================================
   HOME
========================================================= */

function Home({ cartCount }) {
  const heroRef = useRef(null)
  const productRef = useRef(null)
  const titleRef = useRef(null)

  const cinematicRef = useRef(null)
  const cinematicProductRef = useRef(null)
  const shadeTitleRef = useRef(null)
  const shadeCopyRef = useRef(null)
  const ownTitleRef = useRef(null)
  const supportCopyRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!productRef.current) return

      const x =
        event.clientX / window.innerWidth - 0.5

      const y =
        event.clientY / window.innerHeight - 0.5

      gsap.to(productRef.current, {
        rotationY: x * 22,
        rotationX: -y * 15,
        x: x * 30,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    const heroContext =
      gsap.context(() => {
        if (titleRef.current) {
          gsap.from(
            titleRef.current.children,
            {
              y: 120,
              opacity: 0,
              duration: 1.2,
              stagger: 0.18,
              ease: 'power4.out',
            }
          )
        }

        gsap.from('.eyebrow', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
        })

        gsap.from('.hero-description', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: 0.5,
        })

        gsap.from('.hero-actions', {
          y: 25,
          opacity: 0,
          duration: 0.9,
          delay: 0.7,
        })

        if (productRef.current) {
          gsap.from(
            productRef.current,
            {
              scale: 0.6,
              rotationY: -45,
              rotationX: 20,
              opacity: 0,
              duration: 1.6,
              delay: 0.3,
              ease: 'power3.out',
            }
          )

          gsap.to(
            productRef.current,
            {
              y: -18,
              rotation: -4,
              duration: 2.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            }
          )
        }
      }, heroRef)

    const cinematicContext =
      gsap.context(() => {
        if (!cinematicRef.current) return

        gsap.set(
          ownTitleRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
          }
        )

        gsap.set(
          supportCopyRef.current,
          {
            opacity: 0,
            y: 30,
          }
        )

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                cinematicRef.current,
              start: 'top top',
              end: '+=2200',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          })

        timeline.fromTo(
          cinematicProductRef.current,
          {
            xPercent: -50,
            yPercent: -50,
            x: -120,
            y: 70,
            scale: 0.72,
            rotation: -18,
            rotationY: -30,
            opacity: 0,
          },
          {
            x: -100,
            y: 0,
            scale: 1,
            rotation: -6,
            rotationY: 0,
            opacity: 1,
            duration: 1,
          }
        )

        timeline.fromTo(
          shadeTitleRef.current,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
          },
          0.25
        )

        timeline.fromTo(
          shadeCopyRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          0.45
        )

        timeline.to(
          cinematicProductRef.current,
          {
            x: -220,
            rotationY: 180,
            rotation: 8,
            scale: 1.05,
            duration: 1,
          },
          1
        )

        timeline.to(
          shadeTitleRef.current,
          {
            x: 120,
            opacity: 0,
            duration: 0.65,
          },
          1.05
        )

        timeline.to(
          shadeCopyRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.55,
          },
          1.05
        )

        timeline.to(
          '.cinematic-kicker',
          {
            opacity: 0,
            y: -18,
            duration: 0.5,
          },
          1.05
        )

        timeline.to(
          cinematicProductRef.current,
          {
            x: -250,
            y: 60,
            rotationY: 300,
            rotation: 4,
            scale: 0.9,
            duration: 1,
          },
          1.7
        )

        timeline.to(
          ownTitleRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
          },
          1.9
        )

        timeline.to(
          supportCopyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          2.2
        )

        ScrollTrigger.refresh()
      }, cinematicRef)

    window.addEventListener(
      'mousemove',
      handleMouseMove
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      heroContext.revert()
      cinematicContext.revert()
    }
  }, [])

  return (
    <div className="app">
      <section
        className="hero"
        ref={heroRef}
      >
        <Navbar cartCount={cartCount} />

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">
              Beauty × Fashion × Attitude
            </p>

            <h1
              className="hero-title"
              ref={titleRef}
            >
              <span>GLOSS</span>
              <span>THE NIGHT.</span>
            </h1>

            <p className="hero-description">
              High-shine lip gloss and statement shades made for
              the moments when you want the whole room to notice.
            </p>

            <div className="hero-actions">
              <Link to="/lip-gloss">
                <motion.button
                  className="primary-btn"
                  whileHover={{
                    scale: 1.06,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  Shop Lip Gloss ↗
                </motion.button>
              </Link>

              <Link to="/shades">
                <motion.button
                  className="secondary-btn"
                  whileHover={{
                    scale: 1.06,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  Shop Shades ↗
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="hero-art">
            <motion.div
              className="orbit"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div
              className="product-card"
              ref={productRef}
            >
              <div className="product-shine"></div>

              <div className="product-label">
                <span className="product-small">
                  PENGSTORES
                </span>

                <span className="product-main">
                  PENG
                </span>

                <span className="product-small">
                  HIGH SHINE
                </span>
              </div>
            </div>

            <motion.div
              className="float-bubble bubble-one"
              animate={{
                y: [0, -18, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="float-bubble bubble-two"
              animate={{
                y: [0, 15, 0],
                x: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        <div className="background-word">
          PENGSTORES
        </div>
      </section>

      <section
        className="cinematic-section"
        ref={cinematicRef}
      >
        <div className="cinematic-glow"></div>

        <div className="cinematic-grid">
          <div className="cinematic-product-zone">
            <div
              className="cinematic-product"
              ref={cinematicProductRef}
            >
              <div className="cinematic-product-label">
                <span>PENGSTORES</span>
                <strong>SHADE</strong>
                <span>
                  STATEMENT EDITION
                </span>
              </div>
            </div>

            <div className="cinematic-ring"></div>
          </div>

          <div className="cinematic-copy">
            <p className="cinematic-kicker">
              SCENE 02 / STATEMENT SHADES
            </p>

            <h2
              className="cinematic-title"
              ref={shadeTitleRef}
            >
              <span>SHADE</span>
              <span>THE DAY.</span>
            </h2>

            <p
              className="cinematic-description"
              ref={shadeCopyRef}
            >
              Statement frames made to turn a simple look into a
              moment.
            </p>
          </div>
        </div>

        <div className="own-zone">
          <div
            className="own-title"
            ref={ownTitleRef}
          >
            <span>OWN</span>
            <span>THE</span>
            <span>LOOK.</span>
          </div>

          <div
            className="own-support"
            ref={supportCopyRef}
          >
            <p>
              High shine. Strong frames. Zero background energy.
            </p>

            <Link to="/shop">
              <button>
                Explore the collection ↗
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  addToCart,
}) {
  return (
    <motion.article
      layout
      className="shop-product-card"
      whileHover={{
        y: -10,
      }}
    >
      <div
        className={`product-visual ${
          product.tone || ''
        }`}
      >
        <span className="product-category">
          {product.category}
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="shop-product-info">
        <div>
          <p>
            {product.category}
          </p>

          <h3>
            {product.name}
          </h3>
        </div>

        <strong>
          ₦{product.price.toLocaleString()}
        </strong>
      </div>

      <motion.button
        className="add-cart-button"
        whileTap={{
          scale: 0.97,
        }}
        onClick={() =>
          addToCart(product)
        }
      >
        Add to Cart +
      </motion.button>
    </motion.article>
  )
}

/* =========================================================
   SHOP
========================================================= */

function Shop({
  addToCart,
  cartCount,
  catalogProducts,
}) {
  const [filter, setFilter] =
    useState('All')

  const visibleProducts =
    filter === 'All'
      ? catalogProducts
      : catalogProducts.filter(
          (product) =>
            product.category === filter
        )

  return (
    <div className="shop-page">
      <Navbar cartCount={cartCount} />

      <main className="shop-content">
        <div className="shop-page-heading">
          <p className="page-eyebrow">
            PENGSTORES / SHOP
          </p>

          <h1>
            Pick your
            <span> mood.</span>
          </h1>

          <p>
            High-shine gloss and statement frames made to finish
            the look.
          </p>
        </div>

        <div className="shop-toolbar">
          {[
            'All',
            'Lip Gloss',
            'Shades',
          ].map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? 'filter-button active'
                  : 'filter-button'
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="product-grid"
        >
          {visibleProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={
                  addToCart
                }
              />
            )
          )}
        </motion.div>
      </main>
    </div>
  )
}

/* =========================================================
   COLLECTION PAGES
========================================================= */

function ShadesPage({
  addToCart,
  cartCount,
  shadeProducts,
}) {
  return (
    <div className="shop-page shades-collection-page">
      <Navbar cartCount={cartCount} />

      <main className="shop-content shades-content">
        <div className="shades-page-header">
          <p className="page-eyebrow">
            PENGSTORES / SHADES
          </p>

          <h1>
            SHADE THE DAY.
          </h1>

          <p>
            Sculpted silhouettes, statement frames and confident
            finishing touches made to complete your look.
          </p>
        </div>

        <motion.div
          layout
          className="product-grid shades-grid"
        >
          {shadeProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={
                  addToCart
                }
              />
            )
          )}
        </motion.div>
      </main>
    </div>
  )
}

function LipGlossPage({
  addToCart,
  cartCount,
  glossProducts,
}) {
  return (
    <div className="shop-page lip-gloss-collection-page">
      <Navbar cartCount={cartCount} />

      <main className="shop-content shades-content">
        <div className="shades-page-header lip-gloss-page-header">
          <p className="page-eyebrow">
            PENGSTORES / LIP GLOSS
          </p>

          <h1>
            GLOSS
            <br />
            THE MOMENT.
          </h1>

          <p>
            High-shine color made for every mood. Swipe on, stand
            out, and own the moment.
          </p>
        </div>

        <motion.div
          layout
          className="product-grid shades-grid"
        >
          {glossProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={
                  addToCart
                }
              />
            )
          )}
        </motion.div>
      </main>
    </div>
  )
}

/* =========================================================
   CART
========================================================= */

function Cart({
  cart,
  cartCount,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
}) {
  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    )

  return (
    <div className="inner-page">
      <Navbar cartCount={cartCount} />

      <main className="cart-page">
        <div className="cart-heading">
          <p className="page-eyebrow">
            PENGSTORES / CART
          </p>

          <h1>
            Your bag.
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>
              Your cart is currently empty.
            </p>

            <Link to="/shop">
              <button className="primary-btn">
                Start Shopping ↗
              </button>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <motion.article
                  className="cart-item"
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <div className="cart-product-image">
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="cart-product-image-element"
                    />
                  </div>

                  <div className="cart-product-details">
                    <span>
                      {
                        item.category
                      }
                    </span>

                    <h3>
                      {
                        item.name
                      }
                    </h3>

                    <p>
                      ₦
                      {item.price.toLocaleString()}{' '}
                      each
                    </p>

                    <div className="cart-item-controls">
                      <button
                        type="button"
                        className="quantity-control"
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          item.quantity <=
                          1
                        }
                      >
                        −
                      </button>

                      <span>
                        Qty{' '}
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        type="button"
                        className="quantity-control"
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          item.quantity >=
                          10
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      onClick={() =>
                        removeProduct(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-end">
                    <strong>
                      ₦
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                </motion.article>
              ))}
            </div>

            <aside className="cart-summary">
              <p className="summary-label">
                ORDER SUMMARY
              </p>

              <div className="summary-row">
                <span>
                  Total items
                </span>

                <span>
                  {cartCount}
                </span>
              </div>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  ₦
                  {subtotal.toLocaleString()}
                </strong>
              </div>

              <p className="delivery-note">
                Delivery fees will be calculated after your
                delivery details.
              </p>

              <Link to="/checkout">
                <motion.button
                  className="checkout-button"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  Checkout ↗
                </motion.button>
              </Link>

              <Link to="/shop">
                <button className="continue-shopping">
                  ← Continue Shopping
                </button>
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}

/* =========================================================
   CHECKOUT
========================================================= */

function Checkout({
  cart,
  cartCount,
}) {
  const navigate =
    useNavigate()

  const [
    paymentError,
    setPaymentError,
  ] = useState('')

  const [
    paymentStarting,
    setPaymentStarting,
  ] = useState(false)

  const [
    createdOrder,
    setCreatedOrder,
  ] = useState(null)

  const [form, setForm] =
    useState({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      note: '',
    })

  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    )

  const deliveryFee = 0

  const grandTotal =
    subtotal + deliveryFee

  const paystackPublicKey =
    import.meta.env
      .VITE_PAYSTACK_PUBLIC_KEY

  if (cart.length === 0) {
    return (
      <Navigate
        to="/cart"
        replace
      />
    )
  }

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const createPendingOrder =
    async () => {
      if (createdOrder) {
        return createdOrder
      }

      const deliveryAddress =
        `${form.address}, ${form.city}, ${form.state}`

      const items =
        cart.map((item) => ({
          product_id:
            item.id,
          quantity:
            item.quantity,
        }))

      const { data, error } =
        await supabase.rpc(
          'create_order',
          {
            p_customer_name:
              form.fullName,

            p_customer_email:
              form.email,

            p_customer_phone:
              form.phone,

            p_delivery_address:
              deliveryAddress,

            p_order_note:
              form.note,

            p_items:
              items,
          }
        )

      if (error) {
        console.error(
          'Could not create order:',
          error
        )

        throw new Error(
          error.message ||
            'Could not save your order.'
        )
      }

      setCreatedOrder(data)

      return data
    }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    setPaymentError('')
    setPaymentStarting(true)

    try {
      const order =
        await createPendingOrder()

      const reference =
        order?.order_number ||
        `PENG-${Date.now()}`

      if (!paystackPublicKey) {
        setPaymentStarting(false)

        navigate(
          `/order-confirmed?reference=${encodeURIComponent(
            reference
          )}`
        )

        return
      }

      if (
        !paystackPublicKey.startsWith(
          'pk_'
        )
      ) {
        setPaymentStarting(false)

        setPaymentError(
          'The Paystack key configured for this website is invalid.'
        )

        return
      }

      const popup =
        new PaystackPop()

      popup.newTransaction({
        key:
          paystackPublicKey,

        email:
          form.email,

        amount:
          Number(
            order?.total ??
            grandTotal
          ) * 100,

        currency:
          'NGN',

        reference,

        metadata: {
          order_id:
            order?.order_id,

          order_number:
            order?.order_number,

          customer_name:
            form.fullName,

          phone:
            form.phone,
        },

        onSuccess:
          (transaction) => {
            setPaymentStarting(
              false
            )

            navigate(
              `/payment-success?reference=${encodeURIComponent(
                transaction.reference ||
                  reference
              )}`
            )
          },

        onCancel: () => {
          setPaymentStarting(
            false
          )

          setPaymentError(
            'Payment was cancelled. Your order is saved as pending and your cart has not been changed.'
          )
        },

        onError: (
          error
        ) => {
          setPaymentStarting(
            false
          )

          console.error(
            error
          )

          setPaymentError(
            'Paystack could not start the payment. Your order is saved as pending.'
          )
        },
      })
    } catch (error) {
      setPaymentStarting(
        false
      )

      console.error(
        error
      )

      setPaymentError(
        error.message ||
        'We could not save your order. Please try again.'
      )
    }
  }

  return (
    <div className="checkout-page">
      <Navbar cartCount={cartCount} />

      <main className="checkout-content">
        <div className="checkout-heading">
          <p className="page-eyebrow">
            PENGSTORES / CHECKOUT
          </p>

          <h1>
            Finish
            <br />
            the look.
          </h1>

          <p>
            Enter your delivery details and review your order
            before continuing.
          </p>
        </div>

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={
              handleSubmit
            }
          >
            <div className="checkout-section-heading">
              <span>
                01
              </span>

              <div>
                <h2>
                  Contact
                </h2>

                <p>
                  Where should we send order updates?
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field form-field-full">
                <label htmlFor="fullName">
                  Full name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={
                    form.fullName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">
                  Phone / WhatsApp
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+234..."
                  required
                />
              </div>
            </div>

            <div className="checkout-divider"></div>

            <div className="checkout-section-heading">
              <span>
                02
              </span>

              <div>
                <h2>
                  Delivery
                </h2>

                <p>
                  Tell us where your PENGSTORES order is going.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field form-field-full">
                <label htmlFor="address">
                  Delivery address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="House number, street, area..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={
                    form.city
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Lagos"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={
                    form.state
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Lagos State"
                  required
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="note">
                  Order note
                  <span>
                    {' '}
                    Optional
                  </span>
                </label>

                <textarea
                  id="note"
                  name="note"
                  value={
                    form.note
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Anything we should know about your delivery?"
                  rows="3"
                />
              </div>
            </div>

            {paymentError && (
              <div
                role="alert"
                style={{
                  marginTop:
                    '20px',
                  padding:
                    '14px 16px',
                  borderRadius:
                    '14px',
                  background:
                    'rgba(255,79,163,0.10)',
                  color:
                    '#7b174a',
                  fontSize:
                    '13px',
                  lineHeight:
                    1.5,
                }}
              >
                {
                  paymentError
                }
              </div>
            )}

            <motion.button
              type="submit"
              className="payment-button"
              whileHover={
                paymentStarting
                  ? {}
                  : {
                      y: -3,
                      scale:
                        1.01,
                    }
              }
              whileTap={
                paymentStarting
                  ? {}
                  : {
                      scale:
                        0.98,
                    }
              }
              disabled={
                paymentStarting
              }
            >
              {paymentStarting
                ? 'Saving Order...'
                : paystackPublicKey
                ? `Pay ₦${grandTotal.toLocaleString()} ↗`
                : 'Place Order ↗'}
            </motion.button>

            <button
              type="button"
              className="checkout-back-button"
              onClick={() =>
                navigate(
                  '/cart'
                )
              }
            >
              ← Return to Cart
            </button>
          </form>

          <aside className="checkout-summary">
            <p className="summary-label">
              YOUR ORDER
            </p>

            <div className="checkout-products">
              {cart.map(
                (item) => (
                  <div
                    className="checkout-product"
                    key={
                      item.id
                    }
                  >
                    <div className="checkout-product-image">
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                      />

                      <span>
                        {
                          item.quantity
                        }
                      </span>
                    </div>

                    <div className="checkout-product-copy">
                      <span>
                        {
                          item.category
                        }
                      </span>

                      <h3>
                        {
                          item.name
                        }
                      </h3>

                      <p>
                        Qty{' '}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <strong>
                      ₦
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                )
              )}
            </div>

            <div className="checkout-summary-totals">
              <div className="summary-row">
                <span>
                  Items
                </span>

                <span>
                  {
                    cartCount
                  }
                </span>
              </div>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  ₦
                  {subtotal.toLocaleString()}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Delivery
                </span>

                <span>
                  Calculated later
                </span>
              </div>

              <div className="summary-row grand-total-row">
                <span>
                  Total
                </span>

                <strong>
                  ₦
                  {grandTotal.toLocaleString()}
                </strong>
              </div>
            </div>

            <p className="secure-checkout-note">
              Your order details are securely saved before payment.
              Online Paystack payment will activate once the store owner
              provides their public key.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}

/* =========================================================
   CONTACT PAGE
========================================================= */

function ContactPage({
  cartCount,
}) {
  const [form, setForm] =
    useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (
    event
  ) => {
    event.preventDefault()

    const whatsappMessage =
      encodeURIComponent(
`Hello PENGSTORES,

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Subject: ${form.subject}

Message:
${form.message}`
      )

    window.open(
      `https://wa.me/2349011756093?text=${whatsappMessage}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="contact-page">
      <Navbar
        cartCount={
          cartCount
        }
      />

      <main className="contact-content">
        <motion.section
          className="contact-hero"
          initial={{
            opacity: 0,
            y: 45,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div>
            <p className="page-eyebrow">
              PENGSTORES / CONTACT
            </p>

            <h1>
              Talk
              <br />
              to us.
            </h1>
          </div>

          <p className="contact-intro">
            Questions about an order, product recommendations,
            collaborations or anything PENGSTORES? Reach out and
            we’ll get back to you.
          </p>
        </motion.section>

        <section className="contact-layout">

          <div className="contact-details">

            <motion.a
              className="contact-card"
              href="https://wa.me/2349011756093"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -6,
              }}
            >
              <span className="contact-card-number">
                01
              </span>

              <div>
                <p>
                  WHATSAPP
                </p>

                <h2>
                  +234 901 175 6093
                </h2>

                <span>
                  Fastest way to get order support ↗
                </span>
              </div>
            </motion.a>

            <motion.a
              className="contact-card"
              href="https://www.instagram.com/the.pengstore/"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -6,
              }}
            >
              <span className="contact-card-number">
                02
              </span>

              <div>
                <p>
                  INSTAGRAM
                </p>

                <h2>
                  @the.pengstore
                </h2>

                <span>
                  New drops, styling and updates ↗
                </span>
              </div>
            </motion.a>

            <motion.a
              className="contact-card"
              href="https://www.tiktok.com/@thepengstore"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -6,
              }}
            >
              <span className="contact-card-number">
                03
              </span>

              <div>
                <p>
                  TIKTOK
                </p>

                <h2>
                  @thepengstore
                </h2>

                <span>
                  See PENGSTORES in motion ↗
                </span>
              </div>
            </motion.a>

            <motion.a
              className="contact-card"
              href="mailto:tennytoyin@gmail.com"
              whileHover={{
                y: -6,
              }}
            >
              <span className="contact-card-number">
                04
              </span>

              <div>
                <p>
                  EMAIL
                </p>

                <h2>
                  tennytoyin@gmail.com
                </h2>

                <span>
                  Orders, partnerships and enquiries ↗
                </span>
              </div>
            </motion.a>

          </div>

          <motion.form
            className="contact-form"
            onSubmit={
              handleSubmit
            }
            initial={{
              opacity: 0,
              x: 35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.15,
            }}
          >
            <p className="summary-label">
              SEND A MESSAGE
            </p>

            <div className="form-grid">

              <div className="form-field form-field-full">
                <label htmlFor="contact-name">
                  Full name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-phone">
                  Phone / WhatsApp
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+234..."
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={
                    form.subject
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Choose an option
                  </option>

                  <option value="Order Support">
                    Order Support
                  </option>

                  <option value="Product Question">
                    Product Question
                  </option>

                  <option value="Collaboration">
                    Collaboration
                  </option>

                  <option value="Recommendation">
                    Recommendation
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={
                    form.message
                  }
                  onChange={
                    handleChange
                  }
                  rows="6"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

            </div>

            <motion.button
              type="submit"
              className="contact-submit-button"
              whileHover={{
                y: -3,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              Send via WhatsApp ↗
            </motion.button>

            <p className="contact-form-note">
              Your message will open directly in WhatsApp with all
              the information already prepared.
            </p>
          </motion.form>

        </section>
      </main>
    </div>
  )
}

/* =========================================================
   ORDER CONFIRMED
========================================================= */

function OrderConfirmed({
  cartCount,
}) {
  return (
    <div className="inner-page">
      <Navbar
        cartCount={
          cartCount
        }
      />

      <main className="page-hero">
        <p className="page-eyebrow">
          PENGSTORES / ORDER
        </p>

        <h1>
          Order
          <br />
          received.
        </h1>

        <p className="page-description">
          Your order has been saved securely. Online payment is
          currently pending setup, so PENGSTORES will confirm the
          next step with you.
        </p>

        <a
          href="https://wa.me/2349011756093"
          target="_blank"
          rel="noreferrer"
        >
          <button className="primary-btn">
            Contact PENGSTORES ↗
          </button>
        </a>
      </main>
    </div>
  )
}

/* =========================================================
   PAYMENT SUCCESS
========================================================= */

function PaymentSuccess({
  cartCount,
}) {
  return (
    <div className="inner-page">
      <Navbar
        cartCount={
          cartCount
        }
      />

      <main className="page-hero">
        <p className="page-eyebrow">
          PENGSTORES / PAYMENT
        </p>

        <h1>
          Payment
          <br />
          received.
        </h1>

        <p className="page-description">
          Your payment returned successfully. Secure server-side
          Paystack verification will be completed before the
          website goes live.
        </p>

        <Link to="/">
          <button className="primary-btn">
            Return Home ↗
          </button>
        </Link>
      </main>
    </div>
  )
}


/* =========================================================
   ABOUT PAGE
========================================================= */

function AboutPage({ cartCount }) {
  const values = [
    {
      number: '01',
      title: 'Confidence first.',
      text:
        'PENGSTORES is built around pieces that help you finish a look with intention — glossy lips, strong frames and an attitude that feels like your own.',
    },
    {
      number: '02',
      title: 'Easy to wear.',
      text:
        'The collection is curated to work with everyday outfits, nights out, soft glam and statement looks without making style feel complicated.',
    },
    {
      number: '03',
      title: 'Made to be noticed.',
      text:
        'From high-shine gloss to standout shades, every product is selected to add that final detail that changes the whole mood.',
    },
  ]

  return (
    <div className="about-page">
      <Navbar cartCount={cartCount} />

      <main className="about-content">
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-hero-copy">
            <p className="page-eyebrow">
              ABOUT PENGSTORES
            </p>

            <h1>
              OWN
              <br />
              YOUR LOOK.
            </h1>
          </div>

          <div className="about-hero-note">
            <p>
              PENGSTORES is a beauty and fashion accessories brand
              focused on statement shades, high-shine lip gloss and
              confident personal style.
            </p>

            <div className="about-hero-actions">
              <Link to="/shop">
                <motion.button
                  className="primary-btn"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shop Collection ↗
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="secondary-btn"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us ↗
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>

        <section className="about-statement">
          <motion.p
            className="about-statement-kicker"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            THE PENGSTORES IDEA
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            The final detail
            <span> should never feel small.</span>
          </motion.h2>

          <motion.p
            className="about-statement-copy"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1 }}
          >
            A gloss can change the energy of a makeup look. A frame
            can change the whole outfit. PENGSTORES brings those
            finishing touches together in one place so getting
            dressed feels expressive, playful and intentional.
          </motion.p>
        </section>

        <section className="about-values-grid">
          {values.map((value, index) => (
            <motion.article
              key={value.number}
              className="about-value-card"
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -7,
              }}
            >
              <span>
                {value.number}
              </span>

              <h3>
                {value.title}
              </h3>

              <p>
                {value.text}
              </p>
            </motion.article>
          ))}
        </section>

        <section className="about-collections">
          <motion.div
            className="about-collection-card about-shades-card"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div>
              <p className="page-eyebrow">
                COLLECTION / 01
              </p>

              <h2>
                SHADE
                <br />
                THE DAY.
              </h2>

              <p>
                Statement frames for the days when the outfit needs
                one more thing.
              </p>

              <Link to="/shades">
                <button>
                  Shop Shades ↗
                </button>
              </Link>
            </div>

            <div className="about-collection-orb">
              S
            </div>
          </motion.div>

          <motion.div
            className="about-collection-card about-gloss-card"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div>
              <p className="page-eyebrow">
                COLLECTION / 02
              </p>

              <h2>
                GLOSS
                <br />
                THE MOMENT.
              </h2>

              <p>
                High-shine lip color designed to finish soft glam,
                bold looks and everything between.
              </p>

              <Link to="/lip-gloss">
                <button>
                  Shop Lip Gloss ↗
                </button>
              </Link>
            </div>

            <div className="about-collection-orb">
              G
            </div>
          </motion.div>
        </section>

        <motion.section
          className="about-vision"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="about-statement-kicker">
            OUR VISION
          </p>

          <h2>
            Make personal style
            <span> feel effortless.</span>
          </h2>

          <p>
            PENGSTORES aims to become a go-to destination for
            accessible beauty and fashion accessories that help
            customers express themselves confidently.
          </p>

          <div className="about-vision-actions">
            <Link to="/shop">
              <button className="primary-btn">
                Find Your Look ↗
              </button>
            </Link>

            <a
              href="https://www.instagram.com/the.pengstore/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="secondary-btn">
                Follow @the.pengstore ↗
              </button>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  )
}



/* =========================================================
   GLOBAL FOOTER
========================================================= */

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img
              src="/Brand/pengstore-logo.png"
              alt="The Pengstore"
              className="footer-brand-logo"
            />
          </Link>

          <p className="footer-eyebrow">
            PENGSTORES
          </p>

          <h2>
            Own your look.
          </h2>

          <p>
            Statement shades, high-shine lip gloss and confident personal style.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h3>Shop</h3>

            <Link to="/shop">
              All Products
            </Link>

            <Link to="/shades">
              Shades
            </Link>

            <Link to="/lip-gloss">
              Lip Gloss
            </Link>

            <Link to="/cart">
              Cart
            </Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/delivery-policy">
              Delivery Policy
            </Link>

            <Link to="/refund-policy">
              Refund & Returns
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>
          </div>

          <div className="footer-column">
            <h3>Connect</h3>

            <a
              href="https://www.instagram.com/the.pengstore/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/@thepengstore"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </a>

            <a
              href="https://wa.me/2349011756093"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a
              href="mailto:tennytoyin@gmail.com"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>
          © {new Date().getFullYear()} PENGSTORES
        </span>

        <span>
          Beauty × Fashion × Attitude
        </span>
      </div>
    </footer>
  )
}

/* =========================================================
   POLICY PAGE
========================================================= */

function PolicyPage({
  cartCount,
  eyebrow,
  title,
  intro,
  sections,
}) {
  return (
    <div className="policy-page">
      <Navbar cartCount={cartCount} />

      <main className="policy-content">
        <motion.section
          className="policy-hero"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="page-eyebrow">
            {eyebrow}
          </p>

          <h1>
            {title}
          </h1>

          <p>
            {intro}
          </p>
        </motion.section>

        <section className="policy-sections">
          {sections.map((section, index) => (
            <motion.article
              key={section.heading}
              className="policy-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
            >
              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h2>
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


/* =========================================================
   PLACEHOLDER PAGE
========================================================= */

function PlaceholderPage({
  eyebrow,
  title,
  description,
  cartCount,
}) {
  return (
    <div className="inner-page">
      <Navbar
        cartCount={
          cartCount
        }
      />

      <main className="page-hero">
        <p className="page-eyebrow">
          {eyebrow}
        </p>

        <h1>
          {title}
        </h1>

        <p className="page-description">
          {description}
        </p>

        <Link to="/shop">
          <button className="primary-btn">
            Explore Shop ↗
          </button>
        </Link>
      </main>
    </div>
  )
}


/* =========================================================
   PENG ASSIST SUPPORT BOT
========================================================= */

function SupportBot({ cart, cartCount, catalogProducts }) {
  const welcomeMessage = {
    id: 1,
    role: 'assistant',
    text:
      "Hey 👋 I'm PENG Assist. I can help you with products, prices, ordering, payment, your cart and store information. What would you like to know?",
  }

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages =
        localStorage.getItem('peng-assist-messages')

      if (savedMessages) {
        const parsedMessages =
          JSON.parse(savedMessages)

        if (
          Array.isArray(parsedMessages) &&
          parsedMessages.length > 0
        ) {
          return parsedMessages
        }
      }
    } catch (error) {
      console.error(
        'Could not load PENG Assist history:',
        error
      )
    }

    return [welcomeMessage]
  })

  const messagesEndRef = useRef(null)

  const botProducts =
    catalogProducts?.length
      ? catalogProducts
      : products

  const botShades =
    botProducts.filter(
      (product) =>
        product.category === 'Shades'
    )

  const botGlosses =
    botProducts.filter(
      (product) =>
        product.category === 'Lip Gloss'
    )

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  useEffect(() => {
    try {
      localStorage.setItem(
        'peng-assist-messages',
        JSON.stringify(messages)
      )
    } catch (error) {
      console.error(
        'Could not save PENG Assist history:',
        error
      )
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [messages, isOpen])

  const findProduct = (question) => {
    const q = question.toLowerCase()

    return botProducts.find((product) =>
      q.includes(product.name.toLowerCase())
    )
  }

  const getBotResponse = (question) => {
    const q = question.toLowerCase().trim()
    const product = findProduct(q)

    if (product) {
      return {
        text: `${product.name} is currently ₦${product.price.toLocaleString()}. It's part of our ${product.category} collection.`,
        product,
        action: {
          label: `Shop ${product.category} ↗`,
          path:
            product.category === 'Shades'
              ? '/shades'
              : '/lip-gloss',
        },
      }
    }

    if (
      q.includes("what's in my cart") ||
      q.includes('what is in my cart') ||
      q.includes('whats in my cart') ||
      q.includes('show my cart') ||
      q.includes('cart items')
    ) {
      if (cart.length === 0) {
        return {
          text:
            'Your cart is currently empty. I can help you find shades or lip gloss to add.',
          action: {
            label: 'Browse Shop ↗',
            path: '/shop',
          },
        }
      }

      const cartDescription = cart
        .map(
          (item) =>
            `${item.name} × ${item.quantity}`
        )
        .join(', ')

      return {
        text:
          `You currently have ${cartDescription}. Your subtotal is ₦${cartSubtotal.toLocaleString()}.`,
        action: {
          label: 'Open Cart ↗',
          path: '/cart',
        },
      }
    }

    if (
      q.includes('subtotal') ||
      q.includes('cart total') ||
      q.includes('how much is my cart') ||
      q.includes('total in my cart')
    ) {
      if (cartCount === 0) {
        return {
          text:
            'Your cart is empty, so your current subtotal is ₦0.',
          action: {
            label: 'Start Shopping ↗',
            path: '/shop',
          },
        }
      }

      return {
        text:
          `Your current cart subtotal is ₦${cartSubtotal.toLocaleString()} for ${cartCount} ${cartCount === 1 ? 'item' : 'items'}. Delivery is not included yet.`,
        action: {
          label: 'Open Cart ↗',
          path: '/cart',
        },
      }
    }

    if (
      q.includes('how many items') ||
      q.includes('items in my cart') ||
      q.includes('cart count') ||
      q.includes('how many products')
    ) {
      return {
        text:
          cartCount === 0
            ? 'Your cart is currently empty.'
            : `You currently have ${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart.`,
        action: {
          label:
            cartCount === 0
              ? 'Browse Shop ↗'
              : 'Open Cart ↗',
          path:
            cartCount === 0
              ? '/shop'
              : '/cart',
        },
      }
    }

    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey')
    ) {
      return {
        text:
          'Hey 👋 Welcome to PENGSTORES. I can help you find products, check prices, understand ordering, check your cart or connect you with the store.',
      }
    }

    if (
      q.includes('black shade') ||
      q.includes('black shades') ||
      q.includes('dark shade') ||
      q.includes('dark shades')
    ) {
      const blackShades =
        botShades.filter(
          (item) =>
            item.tone === 'black'
        )

      return {
        text:
          `For darker frames, check out ${blackShades
            .map((item) => item.name)
            .join(', ')}. Prices range from ₦7,000 to ₦8,000.`,
        action: {
          label: 'Shop Shades ↗',
          path: '/shades',
        },
      }
    }

    if (
      q.includes('shade') ||
      q.includes('shades') ||
      q.includes('sunglass') ||
      q.includes('sunglasses') ||
      q.includes('glasses')
    ) {
      return {
        text:
          `We currently have ${botShades.length} shades in the collection. Prices are ₦7,000–₦8,000 depending on the style.`,
        action: {
          label: 'View Shades ↗',
          path: '/shades',
        },
      }
    }

    if (
      q.includes('lip gloss') ||
      q.includes('lipgloss') ||
      q.includes('gloss')
    ) {
      return {
        text:
          `We currently have ${botGlosses.length} lip gloss options. Each gloss is ₦5,000.`,
        action: {
          label: 'View Lip Gloss ↗',
          path: '/lip-gloss',
        },
      }
    }

    if (
      q.includes('price') ||
      q.includes('prices') ||
      q.includes('how much') ||
      q.includes('cost')
    ) {
      return {
        text:
          'Our lip glosses are ₦5,000 each. Our shades currently range from ₦7,000 to ₦8,000 depending on the style. Tell me a product name if you want its exact price.',
        action: {
          label: 'Browse Shop ↗',
          path: '/shop',
        },
      }
    }

    if (
      q.includes('quantity') ||
      q.includes('maximum') ||
      q.includes('limit')
    ) {
      return {
        text:
          'You can adjust product quantities directly from your cart. The current website allows up to 10 units of each product per cart.',
        action: {
          label: 'Open Cart ↗',
          path: '/cart',
        },
      }
    }

    if (
      q.includes('order') ||
      q.includes('buy') ||
      q.includes('purchase') ||
      q.includes('checkout')
    ) {
      return {
        text:
          'Choose a product, tap Add to Cart, open your cart, adjust the quantity if needed, then continue to checkout and enter your delivery information.',
        action: {
          label: 'Start Shopping ↗',
          path: '/shop',
        },
      }
    }

    if (
      q.includes('paystack') ||
      q.includes('payment') ||
      q.includes('pay') ||
      q.includes('card')
    ) {
      return {
        text:
          "PENGSTORES is being prepared to accept online payment through Paystack. Online payment will become available once the store owner's payment account is connected.",
        action: {
          label: 'Go to Checkout ↗',
          path: '/checkout',
        },
      }
    }

    if (
      q.includes('delivery') ||
      q.includes('shipping') ||
      q.includes('deliver')
    ) {
      return {
        text:
          'Delivery information is collected during checkout. Delivery fees are not currently included in the product subtotal and will be confirmed based on the delivery location.',
        whatsapp: true,
      }
    }

    if (
      q.includes('instagram') ||
      q === 'ig' ||
      q.includes(' ig ')
    ) {
      return {
        text:
          'You can find PENGSTORES on Instagram at @the.pengstore.',
        external: {
          label: 'Open Instagram ↗',
          url:
            'https://www.instagram.com/the.pengstore/',
        },
      }
    }

    if (
      q.includes('tiktok') ||
      q.includes('tik tok')
    ) {
      return {
        text:
          'PENGSTORES is on TikTok at @thepengstore.',
        external: {
          label: 'Open TikTok ↗',
          url:
            'https://www.tiktok.com/@thepengstore',
        },
      }
    }

    if (
      q.includes('email') ||
      q.includes('mail')
    ) {
      return {
        text:
          'You can email PENGSTORES at tennytoyin@gmail.com.',
        external: {
          label: 'Send Email ↗',
          url:
            'mailto:tennytoyin@gmail.com',
        },
      }
    }

    if (
      q.includes('whatsapp') ||
      q.includes('phone') ||
      q.includes('number') ||
      q.includes('human') ||
      q.includes('person') ||
      q.includes('someone') ||
      q.includes('support') ||
      q.includes('contact') ||
      q.includes('customer service') ||
      q.includes('speak to') ||
      q.includes('talk to')
    ) {
      return {
        text:
          'You can speak directly with PENGSTORES on WhatsApp at +234 901 175 6093.',
        whatsapp: true,
      }
    }

    return {
      text:
        "I don't have a confident answer for that yet. I can help with products, prices, ordering, your cart, payment, delivery or store contact details. For anything else, PENGSTORES support can help you on WhatsApp.",
      whatsapp: true,
    }
  }

  const sendMessage = (question) => {
    const cleanedQuestion =
      question.trim()

    if (!cleanedQuestion) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: cleanedQuestion,
    }

    const botMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      ...getBotResponse(
        cleanedQuestion
      ),
    }

    setMessages((current) => [
      ...current,
      userMessage,
      botMessage,
    ])

    setInput('')
  }

  const clearConversation = () => {
    setMessages([
      {
        ...welcomeMessage,
        id: Date.now(),
      },
    ])

    try {
      localStorage.removeItem(
        'peng-assist-messages'
      )
    } catch (error) {
      console.error(
        'Could not clear PENG Assist history:',
        error
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const quickQuestions = [
    "What's in my cart?",
    'How much are the shades?',
    'Show me lip gloss',
    'Talk to a person',
  ]

  return (
    <div className="support-bot-shell">
      {isOpen && (
        <motion.div
          className="support-bot-panel"
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
        >
          <div className="support-bot-header">
            <div>
              <span className="support-bot-status"></span>

              <p>
                PENGSTORES SUPPORT
              </p>

              <h3>
                PENG Assist
              </h3>
            </div>

            <div className="support-bot-header-actions">
              <button
                type="button"
                className="support-bot-reset"
                onClick={
                  clearConversation
                }
                aria-label="Clear PENG Assist conversation"
                title="Clear conversation"
              >
                ↻
              </button>

              <button
                type="button"
                className="support-bot-close"
                onClick={() =>
                  setIsOpen(false)
                }
                aria-label="Close PENG support chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className="support-bot-messages">
            {messages.map(
              (message) => (
                <div
                  key={message.id}
                  className={`support-message ${message.role}`}
                >
                  <div className="support-message-bubble">
                    {message.text}
                  </div>

                  {message.product && (
                    <div className="support-product-card">
                      <img
                        src={
                          message.product.image
                        }
                        alt={
                          message.product.name
                        }
                      />

                      <div>
                        <span>
                          {
                            message.product.category
                          }
                        </span>

                        <strong>
                          {
                            message.product.name
                          }
                        </strong>

                        <p>
                          ₦
                          {message.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {message.action && (
                    <Link
                      className="support-message-action"
                      to={
                        message.action.path
                      }
                      onClick={() =>
                        setIsOpen(false)
                      }
                    >
                      {
                        message.action.label
                      }
                    </Link>
                  )}

                  {message.external && (
                    <a
                      className="support-message-action"
                      href={
                        message.external.url
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {
                        message.external.label
                      }
                    </a>
                  )}

                  {message.whatsapp && (
                    <a
                      className="support-message-action whatsapp"
                      href="https://wa.me/2349011756093?text=Hello%20PENGSTORES%2C%20I%20need%20some%20help."
                      target="_blank"
                      rel="noreferrer"
                    >
                      Talk to PENGSTORES ↗
                    </a>
                  )}
                </div>
              )
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>

          <div className="support-quick-questions">
            {quickQuestions.map(
              (question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() =>
                    sendMessage(
                      question
                    )
                  }
                >
                  {question}
                </button>
              )
            )}
          </div>

          <form
            className="support-bot-input-row"
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value
                )
              }
              placeholder="Ask PENG..."
              aria-label="Ask PENG a question"
            />

            <button
              type="submit"
              aria-label="Send support message"
            >
              ↑
            </button>
          </form>
        </motion.div>
      )}

      <motion.button
        type="button"
        className="support-bot-launcher"
        onClick={() =>
          setIsOpen(
            (current) =>
              !current
          )
        }
        whileHover={{
          y: -4,
        }}
        whileTap={{
          scale: 0.96,
        }}
        aria-label={
          isOpen
            ? 'Close PENG support chat'
            : 'Open PENG support chat'
        }
      >
        <span className="support-launcher-icon">
          P
        </span>

        {!isOpen && (
          <span className="support-launcher-copy">
            <small>
              NEED HELP?
            </small>

            <strong>
              Ask PENG
            </strong>
          </span>
        )}
      </motion.button>
    </div>
  )
}



const deliveryPolicySections = [
  {
    heading: 'Delivery information',
    paragraphs: [
      'Customers are asked to provide complete and accurate delivery details during checkout, including name, phone number, address, city and state.',
      'Delivery availability, timing and fees may vary depending on the destination. Where a delivery fee has not been shown during checkout, PENGSTORES will confirm the applicable delivery charge before dispatch.',
    ],
  },
  {
    heading: 'Order processing',
    paragraphs: [
      'Orders are prepared after the store has confirmed the order details and, where applicable, confirmed payment.',
      'Customers should ensure that the phone number provided is reachable in case the store or delivery partner needs to confirm directions or delivery details.',
    ],
  },
  {
    heading: 'Delays',
    paragraphs: [
      'Estimated delivery timing can be affected by traffic, weather, courier availability or other circumstances outside the store’s direct control.',
      'If there is a significant delay, customers should contact PENGSTORES through WhatsApp or email for an update.',
    ],
  },
  {
    heading: 'Incorrect delivery details',
    paragraphs: [
      'PENGSTORES is not responsible for delivery issues caused by incorrect or incomplete information supplied by the customer.',
      'If a delivery address needs to be changed, customers should contact the store as quickly as possible before dispatch.',
    ],
  },
]

const refundPolicySections = [
  {
    heading: 'Returns and refund requests',
    paragraphs: [
      'Refund or return requests are reviewed on a case-by-case basis. Customers should contact PENGSTORES as soon as possible after receiving an order if there is a problem with the item received.',
      'Products should not be used, altered or damaged after delivery if a return or exchange request is being made.',
    ],
  },
  {
    heading: 'Damaged or incorrect items',
    paragraphs: [
      'If an item arrives damaged or the wrong product is delivered, customers should contact the store promptly and provide clear photos or other relevant order details.',
      'Where the store confirms that an error occurred, PENGSTORES will communicate the available resolution directly with the customer.',
    ],
  },
  {
    heading: 'Hygiene-sensitive products',
    paragraphs: [
      'Lip products may be subject to additional hygiene restrictions once opened or used. For this reason, opened cosmetic products may not be eligible for return unless the issue relates to damage, defect or an incorrect item.',
    ],
  },
  {
    heading: 'How to request support',
    paragraphs: [
      'For any refund, return or exchange request, contact PENGSTORES through WhatsApp at +234 901 175 6093 or by email at tennytoyin@gmail.com and include your order details.',
    ],
  },
]

const termsSections = [
  {
    heading: 'Using this website',
    paragraphs: [
      'By using the PENGSTORES website, you agree to use it for lawful shopping and information purposes only.',
      'You should not attempt to interfere with the website, misuse its checkout features or submit false or misleading order information.',
    ],
  },
  {
    heading: 'Product information',
    paragraphs: [
      'PENGSTORES aims to display product names, images and prices as accurately as possible. Product appearance may vary slightly due to lighting, screens or photography.',
      'Availability and pricing may change. If an issue affects an order after it has been placed, the store will contact the customer where necessary.',
    ],
  },
  {
    heading: 'Orders',
    paragraphs: [
      'Submitting an order does not guarantee acceptance until the store has confirmed the order details and, where required, payment.',
      'PENGSTORES may contact a customer to clarify delivery information, payment status or product availability before an order is completed.',
    ],
  },
  {
    heading: 'Payments',
    paragraphs: [
      'Online payment functionality is intended to operate through the connected payment provider once the store owner’s payment account is fully configured.',
      'Customers should only complete payments through the checkout options displayed on the official PENGSTORES website or through instructions confirmed by the store.',
    ],
  },
]

const privacySections = [
  {
    heading: 'Information collected',
    paragraphs: [
      'PENGSTORES may collect information customers provide during checkout or contact, including name, email address, phone number, delivery address, city, state and order notes.',
    ],
  },
  {
    heading: 'How information is used',
    paragraphs: [
      'Customer information is used to process orders, arrange delivery, provide support, respond to enquiries and communicate information related to a purchase.',
      'PENGSTORES does not need customers to submit payment card details directly to the website when a third-party payment provider is used.',
    ],
  },
  {
    heading: 'Third-party services',
    paragraphs: [
      'The website may link to third-party services such as Paystack, WhatsApp, Instagram and TikTok. Those services operate under their own privacy practices and terms.',
    ],
  },
  {
    heading: 'Contact and data questions',
    paragraphs: [
      'Customers with questions about information they have provided to PENGSTORES can contact the store through WhatsApp at +234 901 175 6093 or email tennytoyin@gmail.com.',
    ],
  },
]


/* =========================================================
   APP + CART LOGIC
========================================================= */

function App() {
  const [catalogProducts, setCatalogProducts] =
    useState(products)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      const { data, error } =
        await supabase
          .from('products')
          .select(
            'id, name, category, price, image, tone, active'
          )
          .eq('active', true)
          .order('id', {
            ascending: true,
          })

      if (error) {
        console.error(
          'Could not load products from Supabase. Using local fallback catalog:',
          error
        )
        return
      }

      if (
        isMounted &&
        Array.isArray(data) &&
        data.length > 0
      ) {
        setCatalogProducts(
          data.map((product) => ({
            ...product,
            price: Number(product.price),
          }))
        )

        console.log(
          `PENGSTORES catalog loaded from Supabase: ${data.length} products`
        )
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const liveShadeProducts =
    catalogProducts.filter(
      (product) =>
        product.category === 'Shades'
    )

  const liveGlossProducts =
    catalogProducts.filter(
      (product) =>
        product.category === 'Lip Gloss'
    )

  const [cart, setCart] =
    useState(() => {
      try {
        const savedCart =
          localStorage.getItem(
            'pengstores-cart'
          )

        if (savedCart) {
          const parsedCart =
            JSON.parse(savedCart)

          if (
            Array.isArray(
              parsedCart
            )
          ) {
            return parsedCart
          }
        }
      } catch (error) {
        console.error(
          'Could not load saved cart:',
          error
        )
      }

      return []
    })

  useEffect(() => {
    try {
      localStorage.setItem(
        'pengstores-cart',
        JSON.stringify(cart)
      )
    } catch (error) {
      console.error(
        'Could not save cart:',
        error
      )
    }
  }, [cart])

  const addToCart = (
    product
  ) => {
    setCart(
      (currentCart) => {
        const existingItem =
          currentCart.find(
            (item) =>
              item.id ===
              product.id
          )

        if (
          existingItem
        ) {
          return currentCart.map(
            (item) =>
              item.id ===
              product.id
                ? {
                    ...item,
                    quantity:
                      Math.min(
                        item.quantity +
                          1,
                        10
                      ),
                  }
                : item
          )
        }

        return [
          ...currentCart,
          {
            ...product,
            quantity: 1,
          },
        ]
      }
    )
  }

  const increaseQuantity = (
    productId
  ) => {
    setCart(
      (currentCart) =>
        currentCart.map(
          (item) =>
            item.id ===
            productId
              ? {
                  ...item,
                  quantity:
                    Math.min(
                      item.quantity +
                        1,
                      10
                    ),
                }
              : item
        )
    )
  }

  const decreaseQuantity = (
    productId
  ) => {
    setCart(
      (currentCart) =>
        currentCart.map(
          (item) =>
            item.id ===
            productId
              ? {
                  ...item,
                  quantity:
                    Math.max(
                      item.quantity -
                        1,
                      1
                    ),
                }
              : item
        )
    )
  }

  const removeProduct = (
    productId
  ) => {
    setCart(
      (currentCart) =>
        currentCart.filter(
          (item) =>
            item.id !==
            productId
        )
    )
  }

  const cartCount =
    cart.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    )

  return (
    <>
      <Routes>

      <Route
        path="/"
        element={
          <Home
            cartCount={
              cartCount
            }
          />
        }
      />

      <Route
        path="/shop"
        element={
          <Shop
            addToCart={
              addToCart
            }
            cartCount={
              cartCount
            }
            catalogProducts={
              catalogProducts
            }
          />
        }
      />

      <Route
        path="/shades"
        element={
          <ShadesPage
            addToCart={
              addToCart
            }
            cartCount={
              cartCount
            }
            shadeProducts={
              liveShadeProducts
            }
          />
        }
      />

      <Route
        path="/lip-gloss"
        element={
          <LipGlossPage
            addToCart={
              addToCart
            }
            cartCount={
              cartCount
            }
            glossProducts={
              liveGlossProducts
            }
          />
        }
      />

      <Route
        path="/about"
        element={
          <AboutPage
            cartCount={
              cartCount
            }
          />
        }
      />

      <Route
        path="/contact"
        element={
          <ContactPage
            cartCount={
              cartCount
            }
          />
        }
      />

      <Route
        path="/delivery-policy"
        element={
          <PolicyPage
            cartCount={cartCount}
            eyebrow="PENGSTORES / DELIVERY"
            title="Delivery Policy"
            intro="How delivery details, charges and order dispatch are handled."
            sections={deliveryPolicySections}
          />
        }
      />

      <Route
        path="/refund-policy"
        element={
          <PolicyPage
            cartCount={cartCount}
            eyebrow="PENGSTORES / RETURNS"
            title="Refund & Returns"
            intro="What to do if there is an issue with an item or order."
            sections={refundPolicySections}
          />
        }
      />

      <Route
        path="/terms"
        element={
          <PolicyPage
            cartCount={cartCount}
            eyebrow="PENGSTORES / TERMS"
            title="Terms & Conditions"
            intro="Basic terms for using the website and placing orders."
            sections={termsSections}
          />
        }
      />

      <Route
        path="/privacy"
        element={
          <PolicyPage
            cartCount={cartCount}
            eyebrow="PENGSTORES / PRIVACY"
            title="Privacy Policy"
            intro="How customer information is handled when using PENGSTORES."
            sections={privacySections}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            cartCount={
              cartCount
            }
            increaseQuantity={
              increaseQuantity
            }
            decreaseQuantity={
              decreaseQuantity
            }
            removeProduct={
              removeProduct
            }
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <Checkout
            cart={cart}
            cartCount={
              cartCount
            }
          />
        }
      />

      <Route
        path="/order-confirmed"
        element={
          <OrderConfirmed
            cartCount={
              cartCount
            }
          />
        }
      />

      <Route
        path="/payment-success"
        element={
          <PaymentSuccess
            cartCount={
              cartCount
            }
          />
        }
      />

      </Routes>

      <SiteFooter />

      <SupportBot
        cart={cart}
        cartCount={cartCount}
        catalogProducts={
          catalogProducts
        }
      />
    </>
  )
}

export default App