import { observable, action } from 'mobx'
import axios from 'axios'
import { host } from '../api'

class DomainStore {
  @observable domains = []

  async fetchDomains() {
    let {data} = await axios.get(`${host}/domains`)
    console.log(data)
    this.setDomains(data)
  }

  @action
  setDomains(domains) {
    this.domains = domains
  }

  getStores() {
    return this.domains
  }
}

export const domainStore = new DomainStore()