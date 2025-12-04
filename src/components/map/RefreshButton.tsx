import { Button, Text } from "@vapor-ui/core";
import { RefreshOutlineIcon } from "@vapor-ui/icons";

interface RefreshButtonProps {
  onClick?: () => void;
}

const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  return (
    <Button
      className={
        "rounded-v-900 py-v-50 px-v-200 fixed top-20 left-1/2 z-50 w-fit -translate-x-1/2 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)]"
      }
      colorPalette={"primary"}
      variant={"outline"}
      onClick={onClick}
    >
      <RefreshOutlineIcon />
      <Text typography={"subtitle1"}>이 위치에서 검색</Text>
    </Button>
  );
};

export default RefreshButton;
