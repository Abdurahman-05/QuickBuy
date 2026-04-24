import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";

const AddressGrid = () => {
    const addresses = [
        {
            id: 1,
            title: "Home Office",
            recipient: "Alex Mercer",
            address:
                "742 Highview Estates, Suite 900 Cupertino, CA 95014 United States",
            phone: "+1 (555) 012-3456",
            isPrimary: true,
        },
        {
            id: 2,
            title: "Studio Space",
            recipient: "Alex Mercer",
            address:
                "1200 Industrial Way, Bldg 4 Seattle, WA 98101 United States",
            phone: "+1 (555) 987-6543",
            isPrimary: false,
        },
        {
            id: 3,
            title: "London Office",
            recipient: "A. Mercer / Logistics",
            address: "30 St Mary Axe London EC3A 8BF United Kingdom",
            phone: "+44 20 7946 0123",
            isPrimary: false,
        },
    ];

    return (
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">

            {/* ADD CARD */}
            <AddAddressCard />

            {/* ADDRESS CARDS */}
            {addresses.map((addr) => (
                <AddressCard key={addr.id} {...addr} />
            ))}

        </div>
    );
};

export default AddressGrid;