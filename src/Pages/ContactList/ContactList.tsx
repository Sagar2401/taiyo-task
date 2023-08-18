import React, { useEffect, useState } from "react";
import ContactInfo from "./Card";
import Contact from "../../Model/Contact";
import { useAppSelector } from "../../store/hooks";
import DialogBox from "./Dialog";
import Button from "@mui/material/Button";

const ContactList = () => {
  const [contactListData, setContactListData] = useState<Contact[]>();
  const getContactList = useAppSelector((state) => state.contact.contactList);

  useEffect(() => {
    setContactListData(getContactList);
  }, [getContactList]);
  let [open, setOpen] = useState(false);
  let [id, setID] = useState("");

  const ContactUpdate = (id: string) => {
    setID(id);
    setOpen(true);
  };

  const DialogHandle = () => {
    setOpen((current) => !current);
    setID("");
  };
  return (
    <>
      <div className="flex flex-col">
        <Button
          className="add-button"
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
          color="success"
        >
          Add New Contact
        </Button>
        <div className="card-wrapper">
          {contactListData && contactListData?.length > 0 ? (
            contactListData.map((contact) => (
              <ContactInfo
                key={contact.id}
                contact={contact}
                onContactUpdate={ContactUpdate}
              />
            ))
          ) : (
            <div
              className="flex self-center w-full text-center justify-center
            "
            >
              No Contact Found Please add contact from Create contact button
            </div>
          )}
          {open && (
            <DialogBox open={open} id={id} OnDialogHandle={DialogHandle} />
          )}
        </div>
      </div>
    </>
  );
};

export default ContactList;
