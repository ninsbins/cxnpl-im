import React from "react";

export default function AccountCard(props) {
  const account = props.account;

  return (
    <div class="my-3 grow">
      <div class="block rounded-lg shadow-lg bg-white w-lg text-center">
        <div class="py-3 px-6 border-b border-gray-300">
          <h5 class="text-gray-900 text-xl font-medium mb-2">{account.name}</h5>
        </div>
        <div class="p-6">
          <p class="text-gray-700 text-base mb-4">Balance ${account.balance}</p>
        </div>
        <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
          <button
            type="button"
            class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View more
          </button>
        </div>
      </div>
    </div>
  );
}
