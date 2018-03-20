import { join } from 'path';

export default function(api) {
  const { RENDER, ROUTER_MODIFIER, IMPORT } = api.placeholder;

  api.register('modifyRouterFile', ({ memo }) => {
    return memo
      .replace(
        IMPORT,
        `
import { ConnectedRouter } from 'connected-react-router';
${IMPORT}
      `.trim(),
      )
      .replace(
        ROUTER_MODIFIER,
        `
Router = ConnectedRouter;
${ROUTER_MODIFIER}
      `.trim(),
      );
  });


  api.register('modifyEntryFile', ({ memo }) => {
    memo = memo.replace(
      '<%= RENDER %>',
      `
  ReactDOM.render(
    React.createElement(
      require('${join(__dirname, '../redux/index')}').default,
      null,
      React.createElement(require('./router').default),
    ),
    document.getElementById('root'),
);
      `.trim(),
    );
    return memo;
  });
}

