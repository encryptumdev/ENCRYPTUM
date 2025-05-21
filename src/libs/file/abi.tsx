export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "dataId",
        type: "uint256",
      },
    ],
    name: "DataRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dataOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "dataId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "x",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "y",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "z",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "a",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "b",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "c",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "finalizer",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "cat",
        type: "bytes32",
      },
    ],
    name: "DataStored",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "encryptData",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dataOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dataId",
        type: "uint256",
      },
    ],
    name: "getDataFinal",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dataOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_dataId",
        type: "uint256",
      },
    ],
    name: "getDataInit",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dataOwner",
        type: "address",
      },
    ],
    name: "getDataList",
    outputs: [
      {
        internalType: "uint256[]",
        name: "dataId",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dataId",
        type: "uint256",
      },
    ],
    name: "removeData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_x",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_y",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_z",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_a",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_b",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_c",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_cat",
        type: "bytes32",
      },
    ],
    name: "storeData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
