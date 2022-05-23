import React from "react";
import axios from "axios";
import "./App.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputField: "",
      initialCall: false,
    };
    this.url = "http://localhost:3001/hero";
  }

  async getAllHero() {
    const { data } = await axios.get(this.url);
    this.setState((state) => ({
      items: data.map((dat) => ({ _id: dat._id, heroname: dat.heroname, realname: dat.realname })),
    }));
  }

  async componentDidMount() {
    this.getAllHero();
  }

  render() {
    const items = this.state.items.map((item, id) => (
      <li className="hover:line-through"
        key={item._id}
        onClick={(e) => {
          axios.delete(this.url + `/${item._id}`).then((res) => {
            this.setState((state) => ({
              items: state.items.filter((nitem, i) => nitem._id !== item._id),
            }));
            console.log(`Successfully deleted ${res.data} heros`);
          });
        }}
      >
        {item.heroname} - {item.realname}
      </li>
    ));
    return (
      <div className="App pl-8 bg-[#282c34] text-white min-h-screen ml-14">
        <h1 className="text-4xl font-bold mb-8 pt-8 animate-fadeInLeft">Hero Keeper</h1>
        <p className="text-2xl font-medium mb-4">List of your favourite heroes here!</p>
        <ul className="ml-8 list-disc text-xl">
          {items}
        </ul>
      </div>
    );
  }
}

export default Home;
