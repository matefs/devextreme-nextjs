import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";
import DataGrid, { Column } from "devextreme-react/data-grid";

const ProfilePage = async () => {
  const currentSession = await getServerSession();

  if (!currentSession) return null;

  const userFromDatabase = await prismaClient.user.findUnique({
    where: { email: currentSession.user.email },
  });

  const exampleData = [
    {
      id: userFromDatabase.id, // Usar o ID do usuário
      name: userFromDatabase.name,
      email: userFromDatabase.email,
      createdAt: userFromDatabase.createdAt.toISOString(), // Formatar a data para string
    },
  ];

  if (!userFromDatabase) return null;

  return (
    <div className="flex justify-center items-center p-4">
      <DataGrid
      dataSource={exampleData}
      showBorders={true}
      columnAutoWidth={true}
      className="w-full max-w-full sm:max-w-5xl" // Responsivo: largura máxima ajustada para telas menores
      allowColumnResizing={true} // Permite redimensionar colunas
      columnHidingEnabled={true}

      allowColumnReordering={true} // Permite reordenar colunas
      >
      <Column dataField="id" caption="ID" minWidth={100} width={150} /> {/* Ajusta largura mínima */}
      <Column dataField="name" caption="Name" minWidth={150} />
      <Column dataField="email" caption="Email" minWidth={200} />
      <Column dataField="createdAt" caption="Created At" minWidth={150} /> {/* Adiciona largura mínima */}
      </DataGrid>
    </div>
  );
};

export default ProfilePage;
