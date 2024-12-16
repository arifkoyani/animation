import { Blockquote } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function Blockquotee() {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote
      color="orange"
      cite="-Surah Al-Mu’minun (23:8)"
      icon={icon}
      mt="xl"
      styles={{
        root: { color: 'white' }, // Sets the text color to white
        cite: { color: 'white' }  // Ensures the citation is also white
      }}
    >
    And they who are to their trusts <br/>and their promises attentive.
    </Blockquote>
  );
}
