import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout, Flex } from '@radix-ui/themes';

export default function App() {
  return (
    <>
      <Flex direction="column" gap="3" align="start">
        <Callout.Root size="1">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>You will need admin privileges to install and access this application.</Callout.Text>
        </Callout.Root>

        <Callout.Root size="2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>You will need admin privileges to install and access this application.</Callout.Text>
        </Callout.Root>

        <Callout.Root size="3">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>You will need admin privileges to install and access this application.</Callout.Text>
        </Callout.Root>
      </Flex>
    </>
  );
}
