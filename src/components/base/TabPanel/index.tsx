import Box, { BoxProps } from "@mui/material/Box";

export type TabPanelProps = BoxProps & {
  children?: React.ReactNode;
  dir?: string;
  index: string | number;
  value: string | number;
  unmountOnExit?: boolean;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, unmountOnExit = true, ...rest } = props;

  return (
    <Box
      role="tabpanel"
      // hidden={value !== index}
      display={value === index ? "block" : "none"}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...rest}
    >
      {(!unmountOnExit || index === value) && children}
    </Box>
  );
};

export default TabPanel;
