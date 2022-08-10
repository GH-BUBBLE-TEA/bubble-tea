//categories: Milk Tea, Fruit Tea, Latte
const dummyData = [
  {
    teaName: "Signature Boozy Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/01sbmt.png",
    defaultPrice: 12,
    description:
      "Our signature milk tea blended with Barcelo Imperial Rum! It will give you the classic Adulty Bubble Tea experience!",
    stock: 30,
  },
  {
    teaName: "Signature Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/02smt.png",
    defaultPrice: 7,
    description:
      "Our signature black tea blend, complete with brown sugar and dairy-free creamer.",
    stock: 3,
  },
  {
    teaName: "Boozy Brown Sugar Bubble Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/03bbsmt.png",
    defaultPrice: 13,
    description:
      "Our signature milk tea and creamy Rumchata, topped with a brown sugar glaze and tapioca. The perfect indulgence!",
    stock: 4,
  },
  {
    teaName: "Brown Sugar Bubble Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/04bsmt.png",
    defaultPrice: 8,
    description:
      "Our signature milk tea blend topped with a brown sugar glaze and tapioca.",
    stock: 2,
  },
  {
    teaName: "Taro Bubble Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/05tbmt.png",
    defaultPrice: 7,
    description:
      "Made from organic Taro root and dairy-free creamer. Topped with tapioca.",
    stock: 6,
  },
  {
    teaName: "Taro Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/06tmt.png",
    defaultPrice: 6,
    description: "Made from organic Taro root and dairy-free creamer.",
    stock: 3,
  },
  {
    teaName: "Jasmine Bubble Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/07jbmt.png",
    defaultPrice: 7,
    description: "Our Jasmine green tea topped with tapioca.",
    stock: 7,
  },
  {
    teaName: "Jasmine Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/08jmt.png",
    defaultPrice: 6,
    description:
      "Made from our traditional Jasmine green tea and dairy-free creamer.",
    stock: 4,
  },
  {
    teaName: "Strawberry Milk Bubble Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/09sbmt.png",
    defaultPrice: 7,
    description: "Creamy strawberry milk tea and strawberry bubbles!",
    stock: 4,
  },
  {
    teaName: "Strawberry Milk Tea",
    teaCategories: "Milk Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/10smt.png",
    defaultPrice: 6,
    description: "Organic strawberries blended with creamy milk tea!",
    stock: 8,
  },
  {
    teaName: "Winter Melon Jelly Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/11wmft.png",
    defaultPrice: 7,
    description:
      "Our special green tea blended with winter melon and topped with fruit jelly!",
    stock: 3,
  },
  {
    teaName: "Winter Melon Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/12wmt.png",
    defaultPrice: 6,
    description: "Our organic green tea blended with refreshing winter melon.",
    stock: 0,
  },
  {
    teaName: "Boozy Peach Paradise Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/13bppft.png",
    defaultPrice: 12,
    description:
      "Our White Peach fruit tea mixed with tropical Malibu Rum, a promise of paradise!",
    stock: 5,
  },
  {
    teaName: "Peach Paradise Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/14ppft.png",
    defaultPrice: 8,
    description:
      "White Peach and green tea blended together with soft fruit jellies!",
    stock: 4,
  },
  {
    teaName: "Boozy Passion Fruit Green Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/15bpfgt.png",
    defaultPrice: 15,
    description:
      "Our Passion Fruit tea mixed with Cruzan Passion Fruit Rum will be sure to deliver a passionate punch!",
    stock: 2,
  },
  {
    teaName: "Passion Fruit Green Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/16pfgt.png",
    defaultPrice: 7,
    description: "Refreshing Passion Fruit blended with our classic green tea.",
    stock: 3,
  },
  {
    teaName: "Boozy Shirley Temple Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/17bstft.png",
    defaultPrice: 15,
    description:
      "Our Shirley Temple tea mixed with carbonated cherry vodka seltzer puts a new spin on the classic drink!",
    stock: 5,
  },
  {
    teaName: "Shirley Temple Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/18stft.png",
    defaultPrice: 8,
    description:
      "Our cherry black tea blend with hints of lemon and lime, topped with cherry tapioca!",
    stock: 1,
  },
  {
    teaName: "Honey Lemon Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/19lhft.png",
    defaultPrice: 8,
    description:
      "Our classic green tea infused with lemon and sweetened with organic Tupelo honey.",
    stock: 3,
  },
  {
    teaName: "Mango Fruit Tea",
    teaCategories: "Fruit Tea",
    imageURL: "http://localhost:8080/bubble_tea_images/20mft.png",
    defaultPrice: 6,
    description: "Refreshing blend of black tea and mango.",
    stock: 2,
  },
  {
    teaName: "Signature Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/21sl.png",
    defaultPrice: 7,
    description: "Our signature tea blended with lactaid milk! Served hot!",
    stock: 1,
  },
  {
    teaName: "Matcha Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/22ml.png",
    defaultPrice: 7,
    description:
      "Delicious Matcha blended with organic whole cream, dusted with Matcha powder.",
    stock: 6,
  },
  {
    teaName: "Red Bean Matcha Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/23rbml.png",
    defaultPrice: 8,
    description:
      "Our Matcha Latte drizzled with red bean syrup, topped with red beans!",
    stock: 2,
  },
  {
    teaName: "Boozy Grasshopper Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/24bgl.png",
    defaultPrice: 16,
    description:
      "Mint tea, dairy-free creamer, and dark chocolate blended with Cream de Cacao and Creme de Menthe!",
    stock: 4,
  },
  {
    teaName: "Taro Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/25tl.png",
    defaultPrice: 6,
    description: "Our Taro tea blended hot with dairy-free creamer.",
    stock: 3,
  },
  {
    teaName: "Brown Sugar Bubble Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/26bsbl.png",
    defaultPrice: 8,
    description:
      "Our Brown Sugar Bubble Tea blended with lactaid milk, served hot!",
    stock: 6,
  },
  {
    teaName: "Brown Sugar Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/27bsl.png",
    defaultPrice: 7,
    description: "Our Brown Sugar Tea blended with lactaid milk, served hot!",
    stock: 2,
  },
  {
    teaName: "Banana Milk Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/28bml.png",
    defaultPrice: 7,
    description:
      "Delicious banana and lactaid milk, blended with additional dairy-free creamer and chilled!",
    stock: 4,
  },
  {
    teaName: "Vodka Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/29vl.png",
    defaultPrice: 15,
    description: "It's just Vodka. bottom shelf brand.",
    stock: 1,
  },
  {
    teaName: "Grace Hopper Latte",
    teaCategories: "Latte",
    imageURL: "http://localhost:8080/bubble_tea_images/30ghl.png",
    defaultPrice: 20000,
    description: "A strong coffee blended with heavy creamer and milk.",
    stock: 1,
  },
];

module.exports = dummyData;
