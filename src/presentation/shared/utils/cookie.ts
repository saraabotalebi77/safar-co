function getCookie(name: string) {
  const pattern =
    "(?:^|; )" + name.replace(/([.$*|{}()\\/+^])/g, "\\$1") + "=([^;]*)";
  const matches = document.cookie.match(new RegExp(pattern));
  return matches ? atob(matches[1]) : undefined;
}

function setCookie(
  name: string,
  value: string,
  attributes: {
    expires: Date | string;
    domain?: string;
    path?: string;
  }
) {
  attributes = {
    path: "/",
    ...attributes,
  };
  if (attributes.expires instanceof Date) {
    attributes.expires = attributes.expires.toUTCString();
  }

  let updatedCookie = name + "=" + btoa(value);
  
  type AttributeKey = keyof typeof attributes;

  for (const attributeKey in attributes) {
    const key = attributeKey as AttributeKey;
    updatedCookie += "; " + attributeKey + "=" + attributes[key];
  }
  document.cookie = updatedCookie;
}
function deleteCookie(name:string) {
    setCookie(name, "", {
      expires: "-1"
    })
  }
export { getCookie, setCookie, deleteCookie };
