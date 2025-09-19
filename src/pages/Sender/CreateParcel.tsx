import CreateParcelForm from "@/components/module/sender/CreateParcelForm";

function CreateParcel() {
  return (
    <div className="h-screen">
      <h1 className="text-primary text-center text-2xl font-black">
        Create Your Parcel
      </h1>
      <div className="flex items-center justify-center">
        <CreateParcelForm />
      </div>
    </div>
  );
}
export default CreateParcel;
