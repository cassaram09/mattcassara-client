import globalHook from "./globalHook";
// import { useRouter } from "next/router";

const initialState = {
  transitioning: {
    val: false,
    nextHref: "",
  },
};

const actions = {
  changeRoute: (store, nextHref) => {
    // const { transitioning } = store.state;
    // if (!transitioning.val && nextHref !== window.location.pathname) {
    //   store.setState({ transitioning: { val: true, nextHref } });
    // }
    // const router = useRouter();
    // router.push(nextHref);
  },
  exitDone: (store) => {
    const { transitioning } = store.state;

    const nextHref = transitioning.nextHref;

    setTimeout(() => {
      router.push(nextHref);
    }, 250);

    setTimeout(() => {
      store.setState({ transitioning: { val: false, nextHref } });
    }, 500);
  },
};

export default globalHook(React, initialState, actions);
