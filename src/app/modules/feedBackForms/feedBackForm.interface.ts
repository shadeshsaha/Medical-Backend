export type ICreateFeedBackFormReq = {
  feedbackComment: string;
  userName: string;
  email: string;
  contactNumber: string;
};
export type ICreateFeedBackFormResponse = {
  feedbackComment: string;
  createdAt: Date;
  userName: string;
  email: string;
  contactNumber: string;
};

export type IFeedBackFilterRequest = {
  searchTerm?: string | undefined;
  feedbackComment?: string | undefined;
};

export type IUpdateFeedBackRequest = {
  feedbackComment?: string;
  userName?: string;
  email?: string;
  contactNumber?: string;
};
