import React from "react"
import axios from "axios";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heronameInput: "",
      realnameInput: "",
      initialCall: false,
    };
    this.url = "https://herolist-backend.herokuapp.com/hero";
  }

  render() {
    return (
      <div className="App pl-8 bg-[#282c34] text-white min-h-screen ml-14 flex flex-col">
        <h1 className="text-4xl font-bold mb-8 pt-8 animate-fadeInLeft">Hero Keeper</h1>
        <p className="text-2xl font-medium mb-4">Enter your favourite hero here!</p>
        <form onSubmit={async (e) => {
          if (this.state.heronameInput !== "") {
            e.preventDefault();
            const heroname = this.state.heronameInput;
            const realname = this.state.realnameInput;
            this.setState({ heronameInput: "", realnameInput: "" });
            await axios.post(this.url, {
              heroname: heroname,
              realname: realname,
            });
            window.location.assign("/");
          }
        }}>
          <input className="mb-4 p-2 mx-auto rounded text-black"
            onChange={(e) => {
              this.setState({ heronameInput: e.target.value });
            }}
            value={this.state.heronameInput}
            type="text"
            placeholder="Hero name"
          /><br />
          <input className="mb-4 p-2 mx-auto rounded text-black"
            onChange={(e) => {
              this.setState({ realnameInput: e.target.value });
            }}
            value={this.state.realnameInput}
            type="text"
            placeholder="Real name"/><br />
          <input className="bg-gray-200 text-black rounded p-2 active:bg-gray-200" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Post;
