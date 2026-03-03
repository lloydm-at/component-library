import { Fragment } from "react";
import { ChoiceField, TextField } from "../../components/AInput/AInput";

export function AInputPage() {
  return (
    <Fragment>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">AInput Component</h1>
        <p className="text-slate-400">
          Input components for all your form needs.
        </p>
      </div>
      <form>
        <div className="flex flex-col items-center gap-y-6 border-2 p-4 border-indigo-800">
          <h1 className="text-red-700">
            Types of Text fields according to type.
          </h1>
          <TextField type="text" label="name" />
          <TextField type="email" label="email" />
          <TextField type="password" label="password" />
          <TextField type="date" label="date" />
          <TextField type="number" label="amount" />
          <TextField type="url" label="domain" />
        </div>

        <div className="flex flex-col items-center gap-y-6 border-2 p-4 border-indigo-800">
          <h1 className="text-green-700">
            Types of Text fields according to form size.
          </h1>
          <TextField type="text" label="smallname" inputSize="small" />
          <TextField type="text" label="midname" inputSize="mid" />
          <TextField type="text" label="largename" inputSize="large" />
        </div>

        <div className="flex flex-col items-center gap-y-6 border-2 p4 border-indigo-800">
          <h1 className="text-yellow-700">Radio Fields and Checkbox Fields</h1>
          <ChoiceField
            type="radio"
            label="Building"
            options={[
              { value: "oakridge1", label: "IT Center 1" },
              { value: "oakridge2", label: "IT Center 2" },
              { value: "oakridge3", label: "IT Center 3" },
            ]}
          />
          <ChoiceField
            type="checkbox"
            label="Marketplace Products"
            options={[
              { value: "bakery", label: "Bread" },
              { value: "chocolates", label: "Chocolates" },
              { value: "chips", label: "Chips" },
            ]}
          />
        </div>
      </form>
    </Fragment>
  );
}
