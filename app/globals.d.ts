declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "vim-wasm/vim.js?url" {
	export default string;
}
