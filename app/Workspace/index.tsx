import classes from "./style.module.css";
import { DiffView } from "@app/DiffView";
import { Vim } from "@app/Vim";
import af from "@app/data/that-19c2860/after.ts.txt?url";
import bf from "@app/data/that-19c2860/before.ts.txt?url";
import { formatCode } from "@app/format";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

function Workspace(): React.ReactNode {
	const before = useAssetText(bf);
	const after = useAssetText(af);
	const [work, setWork] = React.useState<string>();
	if (!before.isSuccess || !after.isSuccess) {
		return;
	}
	return (
		<div className={classes.workspace}>
			<Vim
				fileName="before.ts"
				fileContent={before.data}
				onSave={(_, content) => {
					const decoded = new TextDecoder().decode(content);
					void formatCode(decoded).then((formatted) => {
						setWork(formatted);
					});
				}}
			/>
			<DiffView left={work ?? before.data} right={after.data} />
		</div>
	);
}

function useAssetText(url: string) {
	return useQuery({
		queryKey: [url],
		queryFn: async () => {
			const response = await fetch(url);
			return await formatCode(await response.text());
		},
		staleTime: Number.POSITIVE_INFINITY,
	});
}

export default Workspace satisfies React.FC;
