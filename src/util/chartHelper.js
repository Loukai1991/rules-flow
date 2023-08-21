// export const replaceUrlParams = (name, value) => {
//     const searchParams = new URLSearchParams(window.location.search);
//     searchParams.set(name, value);
//     let newUrl = window.location.
//         window.history.replaceState('', '', newUrl)
// }
export const getImgUrl = name => {
    const path = new URL('@/icons/svg/', import.meta.url);
    return `${path}/${name}.svg`;
}