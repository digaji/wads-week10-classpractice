import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
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
      items: data.map((dat) => ({ _id: dat._id, heroname: dat.heroname })),
    }));
  }

  async componentDidMount() {
    this.getAllHero();
  }

  render() {
    const items = this.state.items.map((item, id) => (
      <li
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
        {item.heroname}
      </li>
    ));
    return (
      <div className="App">
        <h1>Hero Keeper</h1>
        <p>List all your favorite heroes here</p>
        <ul>{items}</ul>
        <p>
          <strong>Hero name down below</strong>
        </p>
        <input
          onChange={(e) => {
            this.setState({ inputField: e.target.value });
          }}
          onKeyPress={async (e) => {
            if (e.key === "Enter" && this.state.inputField !== "") {
              const heroname = this.state.inputField;
              this.setState({ inputField: "" });
              const res = await axios.post(this.url, {
                heroname: heroname,
                realname: "",
              });
              this.setState((state) => ({
                items: state.items.concat({
                  _id: res.data,
                  heroname: heroname,
                }),
              }));
            }
          }}
          value={this.state.inputField}
          type="text"
          placeholder="Hero name"
        ></input>
      </div>
    );
  }
}

export default App;
