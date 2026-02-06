// queries/home.ts
export const MAIN =`
query ($locale: I18NLocaleCode) {
  main(locale: $locale) {
    documentId
    Header(filters: {}, pagination: {}, sort: []) {
      id
      Link
    }
    Hero {
      id
      Title
      subtitle
      info(filters: {}, pagination: {}, sort: []) {
        icon {
          url
        }
        name
      }
      btns {
        btnIcon {
          url
        }
        btnLink
        btnText
      }
      btns2 {
        btnIcon {
          url
        }
        btnLink
        btnText
      }
      mainImage {
        url
      }
    }
    Services {
      id
      title
      card(filters: {}, pagination: {}, sort: []){
        title
        icon{
          url
        }
        subtitle
        termin
        terminIcon{
          url
        }
        price
        priceIcon{
          url
        }
      }
    }
    workflow {
      id
      title
      card(filters: {}, pagination: {}, sort: []){
        cardTitle
        cardSubtitle
        img{
          url
        }
      }
    }
    WhyChoseUs {
      id
      title
      card(filters: {}, pagination: {}, sort: []){
      cardTitle
        cardSubtitle
        img{
          url
        }
      }
    }
    reviews {
      id
      title
      card(filters: {}, pagination: {}, sort: []){
        name
        description
      }
    }
    footer {
      id
      logo{
        url
      }
      title
      docs
      contacts
      address
      worktime
      fullname
      rigths
    }
  }
}
`
