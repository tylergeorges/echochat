/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
export type ModalId = number;

let modalId: ModalId = 0;

export enum Modal {
  DeleteGuildModal,
  CreateGuildModal,
  CreateChannelModal,
  LeaveGuildModal,
  InviteModal
}

export type ModalContent = (closeModal: () => void) => React.ReactElement;
// export type ModalContent = (id: ModalId) => React.ReactElement;

export interface ModalData {
  id: ModalId;
  deleted: boolean;
  content?: ModalContent;
  close: boolean;
}

type Subscriber = (data: ModalData) => void;

class System {
  subscribers: Set<Subscriber>;

  modals: ModalData[];

  constructor() {
    this.subscribers = new Set();
    this.modals = [];
  }

  publish = (data: ModalData) => {
    const subscribers = Array.from(this.subscribers);

    for (const subscriber of subscribers) {
      subscriber(data);
    }
  };

  subscribe = (subscriber: Subscriber) => {
    this.subscribers.add(subscriber);

    return () => {
      this.subscribers.delete(subscriber);
    };
  };

  add = (id: ModalId, content: ModalContent) => {
    const modal = this.modals.find(m => m.id === id);

    if (modal) {
      return modal.id;
    }

    const newModal: ModalData = {
      content,
      deleted: false,
      id,
      close: false
    };

    this.modals.push(newModal);

    this.publish(newModal);

    return id;
  };

  close = (id?: ModalId) => {
    if (!this.modals.length) {
      return;
    }

    if (typeof id !== 'undefined') {
      const modalIdx = this.modals.findIndex(m => m.id === id);

      const modal = this.modals[modalIdx];

      if (!modal) {
        return;
      }

      modal.close = true;

      this.publish(modal);

      this.modals = this.modals.filter(m => m.id !== modal.id);

      return;
    }

    for (const m of this.modals) {
      if (m.close) {
        continue;
      }

      const modal = {
        ...m,
        close: true
      };

      this.publish(modal);
    }

    this.modals = [];
  };
}

export const ModalSystem = new System();

const baseModal = (data: ModalContent, id?: ModalId) => {
  const newId = ModalSystem.add(id ?? modalId++, data);

  return newId;
};

const ShowModal = baseModal;

export const modal = Object.assign(ShowModal, {
  close: ModalSystem.close
});
