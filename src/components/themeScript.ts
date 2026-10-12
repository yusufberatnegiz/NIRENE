// Applied in <head> before first paint so a stored theme never flashes. Static string, no user data.
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
