import { insertGuild } from '@/lib/db/queries/guild';
import type { User } from '@/lib/db/schema';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ServerFormProps {
  user: User;
  closeModal: () => void;
}

export const ServerForm = ({ user, closeModal }: ServerFormProps) => {
  const createServer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const inputElement = target[0] as HTMLInputElement;

    const serverName = inputElement.value as string;

    if (!serverName.trim() || !user) return;

    await insertGuild({ name: serverName, ownerId: user.id });

    closeModal();
  };

  return (
    <Card className="w-full max-w-lg border-none bg-card vertical">
      <form
        onSubmit={createServer}
        className="w-full flex-1 space-y-1.5 vertical"
        id="create-server-form"
      >
        <CardHeader className="pointer-events-none select-none space-y-1.5 px-6 pt-8 text-center vertical sm:text-left">
          <CardTitle className="text-center">Customize Your Server</CardTitle>

          <CardDescription className="text-center">
            Give your new server a personality with a name and an icon. You can always change it
            later.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-6 center vertical">
          <div className="w-full flex-1 space-y-2">
            <Label htmlFor="server-name" className="uppercase">
              server name
            </Label>
            <Input
              id="server-name"
              autoFocus
              color="form"
              defaultValue={`${user.username}'s server`}
            />
          </div>
        </CardContent>

        <CardFooter className="w-full px-6 py-4 center">
          <Button className="w-full" type="submit">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
