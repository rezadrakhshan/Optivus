import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoryModule } from 'src/rest/category/category.module';
import { LeadModule } from 'src/rest/lead/lead.module';
import { UserModule } from 'src/rest/user/user.module';

export async function swaggerOptions(app, cfg) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Optivus')
    .setDescription('This is my custom crm')
    .setVersion(`${cfg.version}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  const userDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [UserModule],
  });
  const leadDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [LeadModule],
  });
  const categoryDocument = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [CategoryModule],
  });
  SwaggerModule.setup(`${cfg.version}/docs`, app, document);
  SwaggerModule.setup(`${cfg.version}/docs/user`, app, userDocument);
  SwaggerModule.setup(`${cfg.version}/docs/lead`, app, leadDocument);
  SwaggerModule.setup(`${cfg.version}/docs/category`, app, categoryDocument);
}
