
# Documentación del Proyecto

## Tecnologías Utilizadas

### NestJS
Elegí NestJS como framework principal por varias razones:

- Mayor familiaridad con el framework y su ecosistema
- Proporciona una estructura robusta y modular
- Ofrece herramientas integradas que agilizan el desarrollo:
  - Decoradores para GraphQL
  - Sistema de módulos

### Seguridad
Para mejorar la seguridad de los usuarios, se implementó:

- Bcrypt para el hash de contraseñas:
  - Genera un salt único para cada contraseña
  - Las contraseñas nunca se almacenan en texto plano

### Manejo de Datos Transacciones
Implementé transacciones en las operaciones críticas, especialmente en la creación de usuarios:

- Garantiza la consistencia de los datos
- Si alguna operación falla:
  - Se hace rollback automático
  - No se guardan cambios parciales
  - Se mantiene la integridad referencial

Ejemplo de operaciones en transacción:

1. Creación de información de contacto
2. Creación de documento de usuario
3. Creación del usuario


