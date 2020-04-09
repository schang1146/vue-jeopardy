<script>
import Pusher from "pusher-js";

// const pusher = new Pusher(process.env.VUE_APP_KEY, {
//   cluster: process.env.VUE_APP_CLUSTER,
//   useTLS: true,
//   authEndpoint: "http://localhost:5000/pusher/auth"
// });

const pusher = new Pusher("04d1b15146121c04bc9d", {
  cluster: "us3",
  useTLS: true,
  authEndpoint: "http://localhost:5000/pusher/auth"
});

export default {
  getPresenceId() {
    // this function checks the address bar of the browser for params
    let getQueryString = (field, url) => {
      let href = url ? url : window.location.href;
      let reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
      let string = reg.exec(href);
      return string ? string[1] : null;
    };
    // appends "presence" to the result
    let id = getQueryString("id");
    id = "presence-" + id;
    return id;
  },
  subscribeToPusher() {
    let presenceid = this.getPresenceId();
    let channel = pusher.subscribe(presenceid);
    return channel;
  }
};
</script>
