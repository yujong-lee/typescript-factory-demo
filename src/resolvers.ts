const resolvers: Resolvers = {
    Query: {
        artists: async (_, args, { prisma, adminId }) => {
            assert(addminId, "Not authorized");
            assert(args.firstm, "first args is missing");
            const searchText = args.searchText?.toLowerCase();
            const searches: Prisma.ArtistWhereInput | undefined = searchText ? {
                OR: [
                    { accountNum: { contains: searchText, mode: "insensitive" } },
                    { engFirstName: { contains: searchText, mode: "insensitive" } },
                    { engMiddleName: { contains: searchText, mode: "insensitive" } },
                    { engLastName: { contains: searchText, mode: "insensitive" } },
                    { korName: { contains: searchText, mode: "insensitive" } }
                ]
            } : undefined;
            const { edges, pageInfo } = await relayPageNation({
                prisma,
                args,
                type: "artist",
                searches
            });
            return {
                edges,
                pageInfo
            };
        },
        artist: async (_, { id }, { prisma, adminId }) => {
            assert(adminId, "Not authorized");
            return prisma.artist.findUniqie({ where: { id } });
        }
    }
}