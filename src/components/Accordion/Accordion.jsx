import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem.jsx";

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) { // in case it is used by a component that is not wrapped by AccordionContext.Provider
    throw new Error('Accordion-related components must be wrapped by <Accordion>.');
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId(prevId => prevId === id ? null : id);
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>
        {children}
      </ul>
    </AccordionContext.Provider>
  );
}

/**
 * In JavaScript, we can add custom properties to functions/components. 
 * Here we add the AccordionItem as a property in Accordion.
 * Item name is an example. We can use anything.
 * Similar to an inner class in Java.
 */
Accordion.Item = AccordionItem;