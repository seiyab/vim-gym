import classes from "./style.module.css";
import { ConfettiScreen } from "@app/ConfettiScreen";
import { DiffView } from "@app/DiffView";
import { Vim } from "@app/Vim";
import { formatCode } from "@app/format";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

type Props = {
	beforeURL: string;
	afterURL: string;
	onDone: () => void;
};

function Workspace({ beforeURL, afterURL, onDone }: Props): React.ReactNode {
	const before = useAssetText(beforeURL);
	const after = useAssetText(afterURL);
	const [work, setWork] = React.useState<string>();
	const [done, setDone] = React.useState(false);
	if (!before.isSuccess || !after.isSuccess) {
		return;
	}
	return (
		<ConfettiScreen showConfetti={done}>
			<div className={classes.workspace}>
				<Vim
					fileName="before.ts"
					fileContent={before.data}
					onSave={(_, content) => {
						const decoded = new TextDecoder().decode(content);
						void formatCode(decoded).then((formatted) => {
							setWork(formatted);
							if (formatted === after.data) {
								setDone(true);
								onDone();
							}
						});
					}}
				/>
				<DiffView left={work ?? before.data} right={after.data} />
			</div>
		</ConfettiScreen>
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

export default Workspace satisfies React.FC<Props>;
