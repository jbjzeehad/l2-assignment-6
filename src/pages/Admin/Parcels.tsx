import ParcelTable from "@/components/module/Admin/parcelTable";

function Parcels() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center text-primary">
        Manage Parcels
      </h1>
      <ParcelTable />
    </div>
  );
}
export default Parcels;
