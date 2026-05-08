import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from 'src/rest/user/user.module';

export async function swaggerOptions(app, cfg) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Optivus')
    .setDescription('This is my custom crm')
    .setVersion(`${cfg.version}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  const userDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [UserModule],
  });
  SwaggerModule.setup(`${cfg.version}/docs`, app, document);
  SwaggerModule.setup(`${cfg.version}/docs/user`, app, userDocument);
}
