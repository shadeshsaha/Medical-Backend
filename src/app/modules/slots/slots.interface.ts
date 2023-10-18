export type ICreateSlotReq = {
  slotTime: string;
  //   startTime: Date;
  //   endTime: Date;
};
export type ICreateSlotResponse = {
  slotId: string;
  slotTime: string;
  createdAt: Date;
};

export type IUpdateSlotRequest = {
  slotTime?: string;
};
